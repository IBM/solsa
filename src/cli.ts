/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as cp from 'child_process'
import * as fs from 'fs'
import * as minimist from 'minimist'
import * as os from 'os'
import * as path from 'path'
import * as tmp from 'tmp'
import * as util from 'util'
import * as yaml from 'js-yaml'
import { Solution, Bundle } from './solution'
import { dynamic } from './helpers'

function usage () {
  console.error('Usage:')
  console.error('  solsa <command> <solution> [flags]')
  console.error()
  console.error('Available commands:')
  console.error('  build <solution>           build container images')
  console.error('  push <solution>            push container images to registries for current kubernetes context')
  console.error('  yaml <solution>            synthesize yaml for current kubernetes context')
  console.error('  import <resources.yaml>    import yaml resources')
  console.error('  normalize <resources.yaml> normalize yaml syntax')
  console.error()
  console.error('Global flags:')
  console.error('      --cluster <cluster>    use <cluster> instead of current kubernetes cluster')
  console.error('      --config <config>      use <config> file instead of default')
  console.error('  -c, --context <context>    use <context> instead of current kubernetes context')
  console.error('  -d, --debug                output a stack trace on error')
  console.error()
  console.error(`Flags for "yaml" command:`)
  console.error('  -o, --output <file>        output base yaml and context overlays to <file>.tgz')
  console.error('  -a, --appname <name>       add the label solsa.ibm.com/app=<name> to all generated resources')
  console.error()
  console.error(`Flags for "import" command:`)
  console.error('  -o, --output <file>        output imported resources to <file>.js')
  console.error('      --dehelm               remove helm chart artifacts during import (default true)')
  console.error('  -f  --function             export a function that wraps bundle creation (default false)')
  console.error()
}

// handle errors and warnings

class Log {
  warnings = 0

  error (msg: string, fatal?: boolean) {
    if (fatal) {
      const err = new Error(msg)
      throw err
    } else {
      console.error('Warning:', msg)
      this.warnings++
    }
  }
}

// load the configuration file and identify the current cluster and config

function loadConfig (argv: minimist.ParsedArgs, log: Log, fatal?: boolean) {
  // Determine target context and cluster
  let targetContext = ''
  try {
    targetContext = argv.context || cp.execSync('kubectl config current-context', { stdio: [0, 'pipe', 'ignore'] }).toString().trim()
  } catch (err) {
    log.error('Current context is not set', fatal)
  }
  let targetCluster = ''
  try {
    targetCluster = argv.cluster || cp.execSync(`kubectl config view -o jsonpath='{.contexts[?(@.name == "${targetContext}")].context.cluster}'`, { stdio: [0, 'pipe', 'ignore'] }).toString().trim()
    if (!targetCluster.length) {
      log.error('Current cluster is not set', fatal)
    }
  } catch (err) {
    log.error('Current cluster is not set', fatal)
  }

  // Load SolSA config file to get its set of known clusters and contexts
  let config: any
  const name = argv.config || process.env.SOLSA_CONFIG || path.join(os.homedir(), '.solsa.yaml')
  try {
    config = yaml.safeLoad(fs.readFileSync(name).toString())
    if (!Array.isArray(config.clusters)) {
      if (config.clusters) {
        log.error(`Malformed clusters entry in configuration file "${name}"`, fatal)
      }
      config.clusters = []
    }
    if (!Array.isArray(config.contexts)) {
      if (config.contexts) {
        log.error(`Malformed contexts entry in configuration file "${name}"`, fatal)
      }
      config.contexts = []
    }
    if (config.clusters.length === 0 && config.contexts.length === 0) {
      log.error(`No clusters or contexts defined in "${name}"; will only generate base kustomization layer`, fatal)
    }
  } catch (err) {
    log.error(`Unable to load solsa configuration file "${name}"`, fatal)
    config = { contexts: [], clusters: [] }
  }

  // Attempt to find a cluster configuration for all context configurations that don't explictly specify their cluster.
  for (let context of config.contexts) {
    if (!context.cluster) {
      try {
        const cluster = cp.execSync(`kubectl config view -o jsonpath='{.contexts[?(@.name == "${context.name}")].context.cluster}'`, { stdio: [0, 'pipe', 'ignore'] }).toString().trim()
        if (cluster.length && config.clusters.find(({ name }: { name: string }) => name === cluster)) {
          context.cluster = cluster
        } else {
          log.error(`Did not find cluster configuration for context ${context.name}; will use "base" as its parent layer`, fatal)
        }
      } catch (err) {
        log.error(`Error using \`kubectl config\` to determine cluster for context ${context.name}; will use "base" as its parent layer`, fatal)
      }
    }
  }

  // Record the targetCluster and targetContext in the config.
  if (config.clusters.find(({ name }: { name: string }) => name === targetCluster)) {
    config.targetCluster = targetCluster
  } else if (argv.cluster) {
    log.error(`Did not find cluster "${targetCluster}" in configuration file "${name}"`, fatal)
  }
  if (config.contexts.find(({ name }: { name: string }) => name === targetContext)) {
    config.targetContext = targetContext
  } else if (argv.context) {
    log.error(`Did not find context "${targetContext}" in configuration file "${name}"`, fatal)
  }

  return config
}

// solsa yaml

function yamlCommand (app: Solution, argv: minimist.ParsedArgs, log: Log) {
  class Layer {
    name: string
    resources: any = {}
    bases: any = []
    patches: any = {}
    patchesJSON: any = {}
    images: any = []

    constructor (name: string) {
      this.name = name
    }
  }

  class SolsaArchiver {
    outputRoot: string
    layers: { [key: string]: Layer }

    constructor (outputRoot: string) {
      this.outputRoot = outputRoot
      this.layers = { base: new Layer('base') }
    }

    writeToFile (obj: any, fname: string, layer: string) {
      let text
      try {
        obj = JSON.parse(JSON.stringify(obj))
        text = yaml.safeDump(obj, { noArrayIndent: true })
      } catch (err) {
        console.error(util.inspect(obj, { colors: true, depth: 20 }))
        throw err
      }
      fs.writeFileSync(path.join(this.outputRoot, layer, fname), text)
    }

    getLayer (layer: string) {
      this.layers[layer] = this.layers[layer] || new Layer(layer)
      return this.layers[layer]
    }

    addResource (obj: any, layer = 'base') {
      this.getLayer(layer).resources[`${obj.apiVersion.replace(/[/\.]/g, '-')}-${obj.kind}-${obj.name || obj.metadata.name}.yaml`] = obj
    }

    addPatch (patch: any, fname: string, layer = 'base') {
      this.getLayer(layer).patches[fname] = { patch }
    }

    addJSONPatch (patch: any, target: any, layer = 'base') {
      let path = `expose-svc-${target.target.name}.yaml`
      this.getLayer(layer).patchesJSON[path] = { patch, target: Object.assign({ path }, target) }
    }

    finalizeImageRenames (context: any, app: Solution) {
      const images: any[] = []
      for (let name of app.toImages().map(image => image.name)) {
        const pos = name.indexOf(':', name.indexOf('/'))
        let newName = pos === -1 ? name : name.substring(0, pos)
        let newTag = pos === -1 ? undefined : name.substring(pos + 1)
        if (context.images && context.images.find((image: any) => image.name === name || image.name === newName)) continue // already kustomized
        if (images.find(image => image.name === name)) continue // already encountered
        const k: { name: string, newName?: string, newTag?: String } = { name }
        if (context.registry && !name.includes('/')) k.newName = context.registry + '/' + newName
        if (newTag) {
          images.unshift(k) // list tagged images first
        } else {
          if (context.imageTag) k.newTag = context.imageTag // tag image
          images.push(k)
        }
      }
      return (context.images || []).concat(images)
    }

    finalize (config: any, app: Solution) {
      for (const cluster of config.clusters) {
        const clusterLayer = this.getLayer(path.join('cluster', cluster.name))
        clusterLayer.bases.push('./../../base')
        clusterLayer.images = this.finalizeImageRenames(cluster, app)
      }
      for (const context of config.contexts) {
        const contextLayer = this.getLayer(path.join('context', context.name))
        contextLayer.bases.push(context.cluster ? `./../../cluster/${context.cluster}` : './../../base')
        contextLayer.images = this.finalizeImageRenames(context, app)
      }

      fs.mkdirSync(this.outputRoot)
      fs.mkdirSync(path.join(this.outputRoot, 'cluster'))
      fs.mkdirSync(path.join(this.outputRoot, 'context'))
      for (let layer of Object.values(this.layers)) {
        fs.mkdirSync(path.join(this.outputRoot, layer.name))
        for (let fname of Object.keys(layer.resources)) {
          this.writeToFile(layer.resources[fname], fname, layer.name)
        }
        for (let fname of Object.keys(layer.patches)) {
          this.writeToFile(layer.patches[fname].patch, fname, layer.name)
        }
        for (let fname of Object.keys(layer.patchesJSON)) {
          this.writeToFile(layer.patchesJSON[fname].patch, fname, layer.name)
        }
        let kustom: dynamic = {
          apiVersion: 'kustomize.config.k8s.io/v1beta1',
          kind: 'Kustomization',
          bases: layer.bases,
          resources: Object.keys(layer.resources),
          patches: Object.keys(layer.patches),
          patchesJson6902: Object.keys(layer.patchesJSON).map(k => layer.patchesJSON[k].target),
          images: layer.images
        }
        if (argv.appname) kustom.commonLabels = { 'solsa.ibm.com/app': argv.appname }
        this.writeToFile(kustom, 'kustomization.yaml', layer.name)
      }
    }
  }

  const config = loadConfig(argv, log)

  const noKustomizeMsg =
    `Generating YAML without clutser or context specific layers:
         Unable to generate Ingress
         Unable to generate image name rewriting directives`
  if (argv.output) {
    if (config.contexts.length === 0 && config.clusters.length === 0) {
      log.error(noKustomizeMsg)
    }
  } else {
    if (!(config.targetContext || config.targetCluster)) {
      log.error(noKustomizeMsg)
    }
  }

  const dir = tmp.dirSync({ mode: 0o755, prefix: 'solsa_', unsafeCleanup: true })
  const outputRoot = path.join(dir.name, path.basename(argv.output || 'solsa'))

  const sa = new SolsaArchiver(outputRoot)
  for (let item of app.toResources({ config })) {
    if (item.obj) {
      sa.addResource(item.obj, item.layer)
    } else if (item.JSONPatch) {
      sa.addJSONPatch(item.JSONPatch, item.JSONPatchTarget, item.layer)
    } else if (item.patch) {
      sa.addPatch(item.patch, item.name, item.layer)
    }
  }
  sa.finalize(config, app)

  if (argv.output) {
    cp.execSync(`tar -C ${dir.name} -zcf ${argv.output}.tgz ${path.basename(argv.output)}`, { stdio: [0, 1, 2] })
    console.log(`Generated YAML to ${argv.output}.tgz`)
  } else {
    let selectedLayer
    if (config.targetContext) {
      selectedLayer = path.join(outputRoot, 'context', config.targetContext)
    } else if (config.targetCluster) {
      selectedLayer = path.join(outputRoot, 'cluster', config.targetCluster)
    } else {
      selectedLayer = path.join(outputRoot, 'base')
    }
    let kustomize = path.join(__dirname, '..', 'tools', 'kustomize')
    if (!fs.existsSync(kustomize)) kustomize = 'kustomize' // look for kustomize in PATH
    try {
      cp.execSync(`${kustomize}`, { stdio: 'ignore' })
    } catch (err) {
      log.error('Cannot find kustomize; please install kustomize to your PATH', true)
    }
    cp.execSync(`${kustomize} build ${selectedLayer}`, { stdio: [0, 1, 2] })
  }
  dir.removeCallback()
}

// solsa build

function buildCommand (app: Solution, argv: minimist.ParsedArgs, log: Log) {
  function build ({ name, build, main = '.' }: { name: string, build?: string, main?: string }) {
    if (!build) return

    console.log(`Building image "${name}"`)
    if (!fs.existsSync(path.join(build, 'package.json'))) {
      log.error(`Missing package.json in ${build}, skipping image`)
      return
    }

    if (!fs.existsSync(path.join(build, 'node_modules'))) {
      console.log('Running npm install')
      cp.execSync('npm install --prod --no-save', { cwd: build, stdio: [0, 1, 2] })
    }

    console.log('Copying files to temporary folder')
    const dir = tmp.dirSync({ mode: 0x755, prefix: 'solsa_', unsafeCleanup: true })
    cp.execSync(`rsync -rL --exclude=.git . "${dir.name}"`, { cwd: build, stdio: [0, 1, 2] })

    console.log('Running docker build')
    cp.execSync(`docker build -f ${path.join(__dirname, '..', 'runtime', 'node', 'Dockerfile')} "${dir.name}" --build-arg MAIN=${main} -t ${name}`, { cwd: build, stdio: [0, 1, 2] })

    console.log('Reclaiming temporary folder')
    dir.removeCallback()
  }

  const images = app.toImages()

  new Set(images.map(image => image.name)).forEach(name => build(images.find(image => image.name === name) || { name: 'never' }))
}

// solsa push

function pushCommand (app: Solution, argv: minimist.ParsedArgs, log: Log) {
  function rename (name: string, context: any) {
    const pos = name.indexOf(':', name.indexOf('/'))
    let newName = pos === -1 ? name : name.substring(0, pos)
    let newTag = pos === -1 ? undefined : name.substring(pos + 1)
    const image = (context.images || []).find((image: any) => image.name === name || image.name === newName)
    if (image) {
      newName = image.newName || newName
      newTag = image.newTag || newTag
    } else {
      if (context.registry && !name.includes('/')) newName = context.registry + '/' + newName
      newTag = newTag || context.imageTag
    }
    return newTag ? newName + ':' + newTag : newName
  }

  const images = app.toImages().filter(image => image.build)

  const config = loadConfig(argv, log, true)
  const context = config.clusters.find(({ name }: any) => name === config.targetCluster)

  new Set(images.map(image => image.name)).forEach(name => {
    const tag = rename(name, context)
    console.log(`Tagging image "${name}" with tag "${tag}"`)
    cp.execSync(`docker tag "${name}" "${tag}"`, { stdio: [0, 1, 2] })

    if (tag.includes('/')) {
      console.log(`Pushing image "${tag}"`)
      cp.execSync(`docker push "${tag}"`, { stdio: [0, 1, 2] })
    }
  })
}

// solsa import

function importCommand (app: Solution, argv: minimist.ParsedArgs, log: Log) {
  function loadObjects (fileName: string): any[] {
    try {
      const inputString = fs.readFileSync(fileName).toString()
      const pieces = inputString.split(new RegExp('^---+$', 'm'))
      const resources = pieces.map(x => yaml.safeLoad(x))
      return resources
    } catch (err) {
      log.error(err)
      return []
    }
  }

  function snakeToCamel (str: string) {
    return str.replace(/([-_][a-z])/g, (n: string) => n.toUpperCase().replace('-', '').replace('_', ''))
  }

  function writePreamble (outStream: fs.WriteStream) {
    outStream.write('/* eslint-disable no-template-curly-in-string */\n')
    outStream.write('// @ts-check\n')
    outStream.write('const solsa = require(\'solsa\')\n\n')

    if (!argv.function) {
      outStream.write('const app = new solsa.Bundle()\n')
      outStream.write('module.exports = app\n')
    } else {
      outStream.write(`module.exports = function ${snakeToCamel(argv.output)} () {\n`)
      outStream.write('const app = new solsa.Bundle()\n')
    }
  }

  function writeEpilogue (outStream: fs.WriteStream) {
    if (argv.function) {
      outStream.write('return app\n')
      outStream.write('}\n')
    }
  }

  function isExcludedHelmArtifact (obj: any): boolean {
    if (obj.metadata && obj.metadata.annotations && 'helm.sh/hook' in obj.metadata.annotations) {
      return true
    }
    return false
  }

  function mapToSolsaType (apiVersion: string, kind: string): string {
    apiVersion = apiVersion.replace('.k8s.io', '').replace('/', '.').replace('rbac.authorization', 'rbac')
    if (apiVersion === 'v1') {
      if (kind === 'APIGroup' || kind === 'APIGroupList' || kind === 'APIResourceList' || kind === 'APIVersions' ||
        kind === 'DeleteEvent' || kind === 'Status' || kind === 'WatchEvent') {
        apiVersion = 'meta.v1'
      } else {
        apiVersion = 'core.v1'
      }
    }
    return `${apiVersion}.${kind}`
  }

  class Text {
    text: string
    key: string

    static count: number = 0

    constructor (text: string, key: string = '') {
      this.text = text
      this.key = key
    }

    [util.inspect.custom] () {
      const count = this.text.split('\n').length
      if (count < 50) return util.inspect(this.text)
      let filename = `${argv.output}-${++Text.count}`
      if (/^[0-9a-zA-Z _\-\._]+$/.test(this.key)) {
        filename += '-' + this.key
      }
      if (!this.key.includes('.')) {
        try {
          JSON.parse(this.text)
          filename += '.json'
        } catch (error) {
          filename += '.txt'
        }
      }
      fs.writeFileSync(filename, this.text)
      return `require('fs').readFileSync('${filename}').toString()`
    }
  }

  function wrap (val: any, key?: string): any {
    if (val == null) return val
    switch (typeof val) {
      case 'string':
        return new Text(val, key)
      case 'object':
        if (Array.isArray(val)) return val.map(val => wrap(val)) // return new array
        for (let key of Object.keys(val)) val[key] = wrap(val[key], key) // update object in place
    }
    return val
  }

  const outFile = argv.output ? `${argv.output}.js` : 'importedApp.js'
  const inspectOpts = { depth: null, maxArrayLength: null, compact: 4, breakLength: 100 }
  const resources = loadObjects(argv.file).filter(x => x != null)
  const outStream = fs.createWriteStream(outFile)
  writePreamble(outStream)

  resources.forEach(function (val, index) {
    if (argv.dehelm) {
      if (isExcludedHelmArtifact(val)) {
        return
      }
      if (val.metadata && val.metadata.labels) {
        delete val.metadata.labels['helm.sh/chart']
      }
    }
    outStream.write('\n')
    let specialized = false
    if (val.apiVersion && val.kind) {
      const apiVersion = val.apiVersion
      const kind = val.kind
      const solsaType = mapToSolsaType(apiVersion, kind)
      if (solsaType !== 'unknown') {
        specialized = true
        delete val.kind
        delete val.apiVersion
        let varName = `resource_${index}`
        if (val.metadata && val.metadata.name) {
          varName = snakeToCamel(val.metadata.name)
          if (!varName.endsWith(kind)) {
            varName = `${varName}_${kind}`
          }
        }
        outStream.write(`app.solutions.${varName} = new solsa.${solsaType}(`)
        outStream.write(util.inspect(argv.extern ? wrap(val) : val, inspectOpts))
        outStream.write(')\n')
      }
    }
    if (!specialized) {
      outStream.write(`app.solutions.rawResource_${index} = new solsa.KubernetesResource(`)
      outStream.write(util.inspect(argv.extern ? wrap(val) : val, inspectOpts))
      outStream.write(')\n')
    }
  })

  writeEpilogue(outStream)

  outStream.end()
}

function normalizeCommand (app: Solution, argv: minimist.ParsedArgs, log: Log) {
  function loadObjects (fileName: string): any[] {
    try {
      const inputString = fs.readFileSync(fileName).toString()
      const pieces = inputString.split(new RegExp('^---+$', 'm'))
      const resources = pieces.map(x => yaml.safeLoad(x))
      return resources
    } catch (err) {
      log.error(err)
      return []
    }
  }

  process.stdout.write(loadObjects(argv._[1]).map(obj => yaml.safeDump(obj, { noArrayIndent: true, sortKeys: true })).join('---\n'))
}

const commands: { [key: string]: (app: Solution, argv: minimist.ParsedArgs, log: Log) => void } = {
  yaml: yamlCommand, build: buildCommand, push: pushCommand, import: importCommand, normalize: normalizeCommand
}

export function runCommand (args: string[], app: Solution = new Bundle()) {
  tmp.setGracefulCleanup()

  // process command line arguments
  const argv = minimist(args, {
    string: ['cluster', 'config', 'context', 'output', 'appname', 'dehelm'],
    alias: { context: 'c', output: 'o', appname: 'a', function: 'f', extern: 'e' },
    default: { 'dehelm': true, function: false, extern: false }
  })

  argv.command = argv._[0]
  argv.file = argv._[1]

  if (argv._.length !== 2 || !Object.keys(commands).includes(argv.command)) {
    usage()
    process.exit(1)
  }

  // handle errors and warnings

  let log = new Log()

  // process command

  commands[argv.command](app, argv, log)

  if (log.warnings) {
    console.error('Warnings: ' + log.warnings)
  }
}
