#!/usr/bin/env node

const cp = require('child_process')
const archiver = require('archiver')
const fs = require('fs')
const minimist = require('minimist')
const os = require('os')
const path = require('path')
const tmp = require('tmp')
const yaml = require('js-yaml')

tmp.setGracefulCleanup()

class KustomizeLayer {
  constructor (name) {
    this.name = name
    this.resources = {}
    this.bases = []
    this.patches = {}
    this.patchesJSON = {}
    this.images = []
  }
}

class SolsaArchiver {
  constructor (outputRoot) {
    var output = fs.createWriteStream(outputRoot + '.tgz')
    this.archive = archiver('tar', {
      gzip: true,
      zlib: { level: 9 }
    })
    this.layers = {
      base: new KustomizeLayer('base')
    }
    this.outputRoot = outputRoot

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.error(`Generated application YAML to ${outputRoot}.tgz`)
      if (argv.cluster) kustomize()
    })

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    this.archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err
      }
    })

    // good practice to catch this error explicitly
    this.archive.on('error', function (err) {
      throw err
    })

    // pipe archive data to the file
    this.archive.pipe(output)
  }

  _writeToFile (obj, fname, layer) {
    let text
    try {
      text = yaml.safeDump(obj, { noArrayIndent: true })
    } catch (err) {
      console.error(obj)
      throw err
    }
    this.archive.append(text, { name: path.join(path.basename(this.outputRoot), layer, fname) })
  }

  _getLayer (layer) {
    if (this.layers[layer] === undefined) {
      this.layers[layer] = new KustomizeLayer(layer)
    }
    return this.layers[layer]
  }

  addResource (obj, fname, layer = 'base') {
    let kl = this._getLayer(layer)
    kl.resources[fname] = obj
  }

  addPatch (patch, fname, layer = 'base') {
    let kl = this._getLayer(layer)
    kl.patches[fname] = { patch: patch }
  }

  addJSONPatch (patch, target, layer = 'base') {
    let kl = this._getLayer(layer)
    kl.patchesJSON[target.path] = { patch: patch, target: target }
  }

  addBaseToLayer (base, layer) {
    let kl = this._getLayer(layer)
    kl.bases.push(base)
  }

  _finalizeImageRenames (cluster, apps) {
    const images = []
    for (let app of apps) {
      for (let name of app.getImages()) {
        const pos = name.indexOf(':', name.indexOf('/'))
        let newName = pos === -1 ? name : name.substring(0, pos)
        let newTag = pos === -1 ? undefined : name.substring(pos + 1)
        if (cluster.images && cluster.images.find(image => image.name === name || image.name === newName)) continue // already kustomized
        if (images.find(image => image.name === name)) continue // already encountered
        const k = { name }
        if (cluster.registry && !name.includes('/')) k.newName = cluster.registry + '/' + newName
        if (newTag) {
          images.unshift(k) // list tagged images first
        } else {
          if (cluster.imageTag) k.newTag = cluster.imageTag // tag image
          images.push(k)
        }
      }
    }
    return (cluster.images || []).concat(images)
  }

  finalize (userConfig, apps) {
    if (userConfig.clusters) {
      for (const cluster of userConfig.clusters) {
        let clusterLayer = this._getLayer(cluster.name)
        clusterLayer.bases.push('./../base')
        clusterLayer.images = this._finalizeImageRenames(cluster, apps)
      }
    }

    for (let lk of Object.keys(this.layers)) {
      let layer = this.layers[lk]
      for (let fname of Object.keys(layer.resources)) {
        this._writeToFile(layer.resources[fname], fname, layer.name)
      }
      for (let fname of Object.keys(layer.patches)) {
        this._writeToFile(layer.patches[fname].patch, fname, layer.name)
      }
      for (let fname of Object.keys(layer.patchesJSON)) {
        this._writeToFile(layer.patchesJSON[fname].patch, fname, layer.name)
      }
      const kustom = {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        bases: layer.bases,
        resources: Object.keys(layer.resources),
        patches: Object.keys(layer.patches),
        patchesJson6902: Object.keys(layer.patchesJSON).map(k => layer.patchesJSON[k].target),
        images: layer.images
      }
      if (apps[0].name) kustom.commonAnnotations = { 'solsa.ibm.com/app': apps[0].name }
      this._writeToFile(kustom, 'kustomization.yaml', layer.name)
    }

    this.archive.finalize()
  }
}

const argv = minimist(process.argv.slice(2), {
  default: { config: process.env.SOLSA_CONFIG || path.join(os.homedir(), '.solsa.yaml') },
  alias: { output: 'o', config: 'c' },
  string: ['output', 'config', 'cluster']
})

if (argv._.length !== 1) {
  console.error('Usage:')
  console.error('  solsa-yaml path [flags]')
  console.error('Flags:')
  console.error('  -c, --config CONFIG  parse CONFIG file')
  console.error('  --cluster CLUSTER    output YAML for CLUSTER')
  console.error('  -o, --output FILE    write FILE.tgz instead of default bundle.tgz')
  process.exit(1)
}

var userConfig = {}
if (argv.config) {
  try {
    userConfig = yaml.safeLoad(fs.readFileSync(argv.config, 'utf8'))
  } catch (err) {
    console.error(`Unable to load ${argv.config}`)
    console.error('Generating base SolSA YAML layers without target clusters')
  }
}

let apps = require(require('path').resolve(argv._[0]))
if (!Array.isArray(apps)) apps = [apps]

const outputRoot = argv.output ? argv.output : 'bundle'
const sa = new SolsaArchiver(outputRoot)
for (let idx in apps) {
  apps[idx].getResources({ userConfig: userConfig }).forEach(item => {
    if (item.obj) {
      sa.addResource(item.obj, item.name, item.layer)
    } else if (item.JSONPatch) {
      sa.addJSONPatch(item.JSONPatch, item.JSONPatchTarget, item.layer)
    } else if (item.patch) {
      sa.addPatch(item.patch, item.name, item.layer)
    }
  })
}
sa.finalize(userConfig, apps)

function kustomize () {
  if (!userConfig.clusters.find(cluster => cluster.name === argv.cluster)) {
    console.error(`Cannot find cluster "${argv.cluster}" in configuration file`)
    process.exit(1)
  }

  const dir = tmp.dirSync({ mode: '0755', prefix: 'solsa_', unsafeCleanup: true })

  cp.execSync(`tar -C ${dir.name} -zxvf ${outputRoot}.tgz`, { stdio: [0, 1, 2] })
  cp.execSync(`kustomize build ${path.join(dir.name, path.basename(outputRoot), argv.cluster)}`, { stdio: [0, 1, 2] })

  dir.removeCallback()
}
