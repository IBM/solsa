#!/usr/bin/env node

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

import { Solsa } from '../bundle'
import * as cp from 'child_process'
import * as fs from 'fs'
import * as minimist from 'minimist'
import * as os from 'os'
import * as path from 'path'
import * as tmp from 'tmp'
import * as util from 'util'
import * as yaml from 'js-yaml'
import { dynamic } from '../helpers'

const Module = require('module') // TODO

tmp.setGracefulCleanup()

const commands: { [key: string]: () => void } = { yaml: yamlCommand, build: buildCommand, push: pushCommand }

// process command line arguments

const argv = minimist(process.argv.slice(2), {
  string: ['cluster', 'config', 'context', 'output', 'appname'],
  alias: { context: 'c', output: 'o', appname: 'a' }
})

argv.command = argv._[0]
argv.file = argv._[1]

if (argv._.length !== 2 || !Object.keys(commands).includes(argv.command)) {
  console.error('Usage:')
  console.error('  solsa <command> [flags]')
  console.error()
  console.error('Available commands:')
  console.error('  build <solution.js>        build container images')
  console.error('  push <solution.js>         push container images to registries for current kubernetes context')
  console.error('  yaml <solution.js>         synthesize yaml for current kubernetes context')
  console.error()
  console.error('Global flags:')
  console.error('      --cluster <cluster>    use <cluster> instead of current kubernetes cluster')
  console.error('      --config <config>      use <config> file instead of default')
  console.error('  -c, --context <context>    use <context> instead of current kubernetes context')
  console.error()
  console.error(`Flags for "yaml" command:`)
  console.error('  -o, --output <file>        output base yaml and context overlays to <file>.tgz')
  console.error('  -a, --appname <name>       add the label solsa.ibm.com/app=<name> to all generated resources')
  console.error()
  process.exit(1)
}

// handle errors and warnings

let warnings = 0

function reportError (msg: string, fatal?: boolean) {
  if (fatal) {
    const err = new Error(msg)
    throw err
  } else {
    console.error('Warning:', msg)
    warnings++
  }
}

// load the configuration file and identify the current cluster and config

function loadConfig (fatal?: boolean) {
  // Determine target context and cluster
  let targetContext = ''
  try {
    targetContext = argv.context || cp.execSync('kubectl config current-context', { stdio: [0, 'pipe', 'ignore'] }).toString().trim()
  } catch (err) {
    reportError('Current context is not set', fatal)
  }
  let targetCluster = ''
  try {
    targetCluster = argv.cluster || cp.execSync(`kubectl config view -o jsonpath='{.contexts[?(@.name == "${targetContext}")].context.cluster}'`, { stdio: [0, 'pipe', 'ignore'] }).toString().trim()
    if (!targetCluster.length) {
      reportError('Current cluster is not set', fatal)
    }
  } catch (err) {
    reportError('Current cluster is not set', fatal)
  }

  // Load SolSA config file to get its set of known clusters and contexts
  let config
  const name = argv.config || process.env.SOLSA_CONFIG || path.join(os.homedir(), '.solsa.yaml')
  try {
    config = yaml.safeLoad(fs.readFileSync(name).toString())
    if (!Array.isArray(config.clusters)) {
      if (config.clusters) {
        reportError(`Malformed clusters entry in configuration file "${name}"`, fatal)
      }
      config.clusters = []
    }
    if (!Array.isArray(config.contexts)) {
      if (config.contexts) {
        reportError(`Malformed contexts entry in configuration file "${name}"`, fatal)
      }
      config.contexts = []
    }
    if (config.clusters.length === 0 && config.contexts.length === 0) {
      reportError(`No clusters or contexts defined in "${name}"; will only generate base kustomization layer`, fatal)
    }
  } catch (err) {
    reportError(`Unable to load solsa configuration file "${name}"`, fatal)
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
          reportError(`Did not find cluster configuration for context ${context.name}; will use "base" as its parent layer`, fatal)
        }
      } catch (err) {
        reportError(`Error using \`kubectl config\` to determine cluster for context ${context.name}; will use "base" as its parent layer`, fatal)
      }
    }
  }

  // Record the targetCluster and targetContext in the config.
  if (config.clusters.find(({ name }: { name: string }) => name === targetCluster)) {
    config.targetCluster = targetCluster
  } else if (argv.cluster) {
    reportError(`Did not find cluster "${targetCluster}" in configuration file "${name}"`, fatal)
  }
  if (config.contexts.find(({ name }: { name: string }) => name === targetContext)) {
    config.targetContext = targetContext
  } else if (argv.context) {
    reportError(`Did not find context "${targetContext}" in configuration file "${name}"`, fatal)
  }

  return config
}

// load solution file

function loadApp (): Solsa {
  // resolve module even if not in default path
  const _resolveFilename = Module._resolveFilename
  Module._resolveFilename = function (request: string, parent: string) {
    if (request.startsWith('solsa')) {
      try {
        return _resolveFilename(request, parent)
      } catch (error) {
        return require.resolve(request.replace('solsa', '..'))
      }
    } else {
      return _resolveFilename(request, parent)
    }
  }

  try {
    const app = require(path.resolve(argv.file))
    if (!(app._solsa)) {
      reportError(`No bundle exported by "${argv.file}"`, true)
    }
    return app._solsa
  } finally {
    Module._resolveFilename = _resolveFilename
  }
}

// solsa yaml

function yamlCommand () {
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

    finalizeImageRenames (context: any, app: Solsa) {
      const images: any[] = []
      for (let name of app.getImages().map(image => image.name)) {
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

    finalize (config: any, app: Solsa) {
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

  const app = loadApp()

  const config = loadConfig()

  const noKustomizeMsg =
  `Generating YAML without clutser or context specific layers:
           Unable to generate Ingress
           Unable to generate image name rewriting directives`
  if (argv.output) {
    if (config.contexts.length === 0 && config.clusters.length === 0) {
      reportError(noKustomizeMsg)
    }
  } else {
    if (!(config.targetContext || config.targetCluster)) {
      reportError(noKustomizeMsg)
    }
  }

  const dir = tmp.dirSync({ mode: 0o755, prefix: 'solsa_', unsafeCleanup: true })
  const outputRoot = path.join(dir.name, path.basename(argv.output || 'solsa'))

  const sa = new SolsaArchiver(outputRoot)
  for (let item of app.getResources({ config })) {
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
    try {
      let selectedLayer
      if (config.targetContext) {
        selectedLayer = path.join(outputRoot, 'context', config.targetContext)
      } else if (config.targetCluster) {
        selectedLayer = path.join(outputRoot, 'cluster', config.targetCluster)
      } else {
        selectedLayer = path.join(outputRoot, 'base')
      }
      cp.execSync(`kustomize build ${selectedLayer}`, { stdio: [0, 1, 2] })
    } catch (err) {
      console.log(err)
      if (!(err.signal === 'SIGPIPE')) {
        throw err
      }
    }
  }
  dir.removeCallback()
}

// solsa build

function buildCommand () {
  function build ({ name, build, main = '.' }: { name: string, build?: string, main?: string }) {
    if (!build) return

    console.log(`Building image "${name}"`)
    if (!fs.existsSync(path.join(build, 'package.json'))) {
      reportError(`Missing package.json in ${build}, skipping image`)
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
    cp.execSync(`docker build -f ${path.join(__dirname, '..', '..', 'runtime', 'node', 'Dockerfile')} "${dir.name}" --build-arg MAIN=${main} -t ${name}`, { cwd: build, stdio: [0, 1, 2] })

    console.log('Reclaiming temporary folder')
    dir.removeCallback()
  }

  const images = loadApp().getImages()

  new Set(images.map(image => image.name)).forEach(name => build(images.find(image => image.name === name) || { name: 'never' }))
}

// solsa push

function pushCommand () {
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

  const images = loadApp().getImages().filter(image => image.build)

  const config = loadConfig(true)
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

// process command

commands[argv.command]()

if (warnings) {
  console.error('Warnings: ' + warnings)
}
