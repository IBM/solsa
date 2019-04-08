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
  constructor (outputRoot) {
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
      console.error(`Generated application YAML to ${outputRoot}.tgz`)
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

  _finalizeIngress (cluster, apps) {
    for (let idx in apps) {
      const exposedApp = apps[idx]
      const endpoints = exposedApp._exposedServices()
      if (cluster.ingress.iks && (cluster.nature || 'kubernetes').toLowerCase() === 'kubernetes') {
        const ingress = {
          apiVersion: 'extensions/v1beta1',
          kind: 'Ingress',
          metadata: {
            name: exposedApp.name + '-ing-iks',
            labels: {
              'solsa.ibm.com/name': exposedApp.name
            }
          },
          spec: {
            tls: [{
              hosts: endpoints.map(ep => ep.name + '.' + cluster.ingress.iks.subdomain),
              secretName: cluster.ingress.iks.tlssecret
            }],
            rules: endpoints.map(function (ep) {
              return {
                host: ep.name + '.' + cluster.ingress.iks.subdomain,
                http: {
                  paths: [{
                    path: '/',
                    backend: {
                      serviceName: ep.service.name,
                      servicePort: ep.service.port
                    }
                  }]
                }
              }
            })
          }
        }
        this.addResource(ingress, `ingress-${exposedApp.name}.yaml`, cluster.name)
      } else if (cluster.ingress.nodePort) {
        if ((cluster.nature || 'kubernetes').toLowerCase() === 'kubernetes') {
          for (let idx in endpoints) {
            let ep = endpoints[idx]
            const port = cluster.ingress.nodePort + parseInt(idx)
            const nodePortPatch = [
              {
                op: 'replace',
                path: '/spec/type',
                value: 'NodePort'
              }, {
                op: 'add',
                path: '/spec/ports/0/nodePort',
                value: port
              }
            ]
            const nodePortPatchTarget = {
              target: {
                version: 'v1',
                kind: 'Service',
                name: ep.service.name
              },
              path: `expose-svc-${exposedApp.name}-${port}.yaml`
            }
            this.addJSONPatch(nodePortPatch, nodePortPatchTarget, cluster.name)
          }
        }
        if ((cluster.nature || 'kubernetes').toLowerCase() === 'knative') {
          console.error(`Warning for cluster ${cluster.name}: NodePort Ingress is not supported with Knative target`)
        }
      }
    }
  }

  _finalizeImageRenames (cluster, apps) {
    let images = cluster.images || []
    if (!cluster.registry) return images

    for (let idx in apps) {
      const app = apps[idx]
      // map images to registry if not already mapped
      const names = Object.values(app._images()).map(({ name }) => name)
      for (let name of names) {
        if (!images.find(renaming => renaming.name === name)) {
          images.push({ name, newName: `${cluster.registry}/${name}` })
        }
      }
    }
    return images
  }

  finalize (userConfig, apps) {
    if (userConfig.clusters) {
      for (const cluster of userConfig.clusters) {
        let clusterLayer = this._getLayer(cluster.name)
        if (cluster.ingress) {
          this._finalizeIngress(cluster, apps)
        }
        clusterLayer.images = this._finalizeImageRenames(cluster, apps)
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
          'solsa.ibm.com/app': apps[0].name
        },
        bases: layer.bases,
        resources: Object.keys(layer.resources),
        patches: Object.keys(layer.patches),
        patchesJson6902: Object.keys(layer.patchesJSON).map(k => layer.patchesJSON[k].target),
        images: layer.images
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
    try {
      userConfig = yaml.safeLoad(fs.readFileSync(argv.config, 'utf8'))
    } catch (err) {
      console.error(`Unable to load ${argv.config}`)
      console.error('Generating base SolSA YAML layers without target clusters')
    }
  }

  let apps = require(require('path').resolve(argv._[0]))
  if (!Array.isArray(apps)) apps = [apps]

  const outputRoot = argv.output ? argv.output : 'solsa-' + apps[0].name.toLowerCase()
  const sa = new SolsaArchiver(outputRoot)
  for (let idx in apps) {
    await apps[idx]._yaml(sa)
  }
  sa.finalize(userConfig, apps)
}

global.__yaml = true

main()
