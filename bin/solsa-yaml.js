#!/usr/bin/env node

const archiver = require('archiver')
const fs = require('fs')
const minimist = require('minimist')
const os = require('os')
const path = require('path')
const yaml = require('js-yaml')

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
  constructor (app, outputRoot) {
    this.app = app
    var output = fs.createWriteStream(outputRoot + '.tgz')
    this.archive = archiver('tar', {
      gzip: true,
      zlib: { level: 9 }
    })
    this.layers = { base: new KustomizeLayer('base') }
    this.outputRoot = outputRoot

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.log(`Generated application YAML to ${outputRoot}.tgz`)
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
    this.archive.append(yaml.safeDump(obj, { noArrayIndent: true }),
      { name: path.join(this.outputRoot, layer, fname) })
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

  addPatch (patch, target, fname, layer = 'base') {
    let kl = this._getLayer(layer)
    kl.patches[fname] = { patch: patch, target: target }
  }

  addJSONPatch (patch, target, layer = 'base') {
    let kl = this._getLayer(layer)
    kl.patchesJSON[target.path] = { patch: patch, target: target }
  }

  addBaseToLayer (base, layer) {
    let kl = this._getLayer(layer)
    kl.bases.push(base)
  }

  _finalizeIngress (cluster) {
    if (cluster.ingress.iks && (cluster.nature || 'kubernetes').toLowerCase() === 'kubernetes') {
      const ingress = {
        apiVersion: 'extensions/v1beta1',
        kind: 'Ingress',
        metadata: {
          name: this.app.name + '-ing-iks',
          labels: {
            'solsa.ibm.com/name': this.app.name
          }
        },
        spec: {
          tls: [{
            hosts: [
              this.app.name + '.' + cluster.ingress.iks.subdomain
            ],
            secretName: cluster.ingress.iks.tlssecret
          }],
          rules: [{
            host: this.app.name + '.' + cluster.ingress.iks.subdomain,
            http: {
              paths: [{
                path: '/',
                backend: {
                  serviceName: this.app.name,
                  servicePort: 'solsa'
                }
              }]
            }
          }]
        }
      }
      this.addResource(ingress, 'ingress.yaml', cluster.name)

      // NOTHING TO DO FOR Knative (Ingress automatically configured for Knative Services on IKS)
    } else if (cluster.ingress.nodePort) {
      if ((cluster.nature || 'kubernetes').toLowerCase() === 'kubernetes') {
        const nodePortPatch = [
          {
            op: 'replace',
            path: '/spec/type',
            value: 'NodePort'
          }, {
            op: 'add',
            path: '/spec/ports/0/nodePort',
            value: cluster.ingress.nodePort
          }
        ]
        const nodePortPatchTarget = {
          target: {
            version: 'v1',
            kind: 'Service',
            name: this.app.name
          },
          path: 'expose-svc.yaml'
        }
        this.addJSONPatch(nodePortPatch, nodePortPatchTarget, cluster.name)
      }
      if ((cluster.nature || 'kubernetes').toLowerCase() === 'knative') {
        console.log(`Warning for cluster ${cluster.name}: NodePort Ingress is not supported with Knative target`)
      }
    }
  }

  _finalizeImageRenames (cluster, theApp) {
    let images = cluster.images || []
    if (!cluster.registry) return images

    // map images to registry if not already mapped
    const names = Object.values(theApp._images()).map(({ name }) => name)
    for (let name of names) {
      if (!images.find(renaming => renaming.name === name)) {
        images.push({ name, newName: `${cluster.registry}/${name}` })
      }
    }
    return images
  }

  finalize (userConfig, theApp) {
    if (userConfig.clusters) {
      for (const cluster of userConfig.clusters) {
        let clusterLayer = this._getLayer(cluster.name)
        if (cluster.ingress) {
          this._finalizeIngress(cluster)
        }
        clusterLayer.images = this._finalizeImageRenames(cluster, theApp)
        clusterLayer.bases.push('./../base', `./../${cluster.nature || 'kubernetes'}`)
      }
    }

    for (let lk of Object.keys(this.layers)) {
      let layer = this.layers[lk]
      for (let fname of Object.keys(layer.resources)) {
        this._writeToFile(layer.resources[fname], fname, layer.name)
      }
      for (let fname of Object.keys(layer.patches)) {
        this._writeToFile(layer.patches[fname], fname, layer.name)
      }
      for (let fname of Object.keys(layer.patchesJSON)) {
        this._writeToFile(layer.patchesJSON[fname].patch, fname, layer.name)
      }
      const kustom = {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        commonAnnotations: {
          'solsa.ibm.com/app': this.app.name
        },
        bases: layer.bases,
        resources: Object.keys(layer.resources),
        patches: Object.keys(layer.patches),
        patchesJson6902: Object.keys(layer.patchesJSON).map(k => layer.patchesJSON[k].target)
      }
      this._writeToFile(kustom, 'kustomization.yaml', layer.name)
    }

    this.archive.finalize()
  }
}

async function main () {
  const argv = minimist(process.argv.slice(2), {
    default: { config: process.env.SOLSA_CONFIG || path.join(os.homedir(), '.solsa.yaml') },
    alias: { output: 'o', config: 'c' },
    string: ['output', 'config']
  })

  var userConfig = {}
  if (argv.config) {
    userConfig = yaml.safeLoad(fs.readFileSync(argv.config, 'utf8'))
  }

  const theApp = require(require('path').resolve(argv._[0]))
  const outputRoot = argv.output ? argv.output : 'solsa-' + theApp.name.toLowerCase()
  const sa = new SolsaArchiver(theApp, outputRoot)
  await theApp._yaml(sa)
  sa.finalize(userConfig, theApp)
}

global.__yaml = true

main()
