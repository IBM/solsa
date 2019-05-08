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
    this.layers = {
      base: new KustomizeLayer('base'),
      knative: new KustomizeLayer('knative'),
      kubernetes: new KustomizeLayer('kubernetes')
    }
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

  _finalizeIngress (cluster, apps) {
    for (let idx in apps) {
      const exposedServices = apps[idx].getExposedServices()
      for (let idx in exposedServices) {
        let es = exposedServices[idx]
        if ((cluster.nature || 'kubernetes').toLowerCase() === 'kubernetes') {
          const patchAnnotation = {
            apiVersion: 'v1',
            kind: 'Service',
            metadata: {
              name: es.service.name,
              annotations: { 'solsa.ibm.com/exposed': true }
            }
          }
          this.addPatch(patchAnnotation, `${es.service.name}-annotate-exposed-svc.yml`, cluster.name)

          if (cluster.ingress.iks) {
            const vhost = es.service.name + '.' + cluster.ingress.iks.subdomain
            const ingress = {
              apiVersion: 'extensions/v1beta1',
              kind: 'Ingress',
              metadata: {
                name: es.service.name + '-ing-iks',
                labels: {
                  'solsa.ibm.com/name': es.service.name
                }
              },
              spec: {
                tls: [{
                  hosts: [vhost],
                  secretName: cluster.ingress.iks.tlssecret
                }],
                rules: [{
                  host: vhost,
                  http: {
                    paths: es.endpoints.flatMap(function (ep) {
                      const rules = []
                      ep.paths.map(function (p) {
                        rules.push({
                          path: p,
                          backend: {
                            serviceName: es.service.name,
                            servicePort: ep.port.name
                          }
                        })
                      })
                      return rules
                    })
                  }
                }]
              }
            }
            this.addResource(ingress, `ingress-${es.service.name}.yaml`, cluster.name)
          } else if (cluster.ingress.nodePort) {
            if ((cluster.nature || 'kubernetes').toLowerCase() === 'kubernetes') {
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
                  name: es.service.name
                },
                path: `expose-svc-${es.service.name}-${port}.yaml`
              }
              this.addJSONPatch(nodePortPatch, nodePortPatchTarget, cluster.name)
            }
          }
        } else if (cluster.ingress.istio) {
          const gw = {
            apiVersion: 'networking.istio.io/v1alpha3',
            kind: 'Gateway',
            metadata: {
              name: es.service.name + '-gw',
              labels: {
                'solsa.ibm.com/name': es.service.name
              }
            },
            spec: {
              selector: {
                istio: 'ingressgateway'
              },
              servers: [{
                port: {
                  number: 80,
                  name: 'http',
                  protocol: 'HTTP'
                },
                hosts: ['*']
              }]
            }
          }
          this.addResource(gw, `gw-${es.service.name}.yaml`, cluster.name)
          const vs = {
            apiVersion: 'networking.istio.io/v1alpha3',
            kind: 'VirtualService',
            metadata: {
              name: es.service.name + '-vs',
              labels: {
                'solsa.ibm.com/name': es.service.name
              }
            },
            spec: {
              hosts: ['*'],
              gateways: [es.service.name + '-gw'],
              // FIXME: I am not sure how to update this.  -- Dave.
              http: es.map(function (ep) {
                return {
                  match: ep.paths.map(function (p) {
                    return {
                      uri: { exact: p }
                    }
                  }),
                  route: [{
                    destination: {
                      host: ep.service.name,
                      port: { number: ep.service.port }
                    }
                  }]
                }
              })
            }
          }
          this.addResource(vs, `vs-${es.service.name}.yaml`, cluster.name)
        }
      }
    }
  }

  _finalizeImageRenames (cluster, apps) {
    let images = cluster.images || []
    if (!cluster.registry && !cluster.imageTag) return images

    for (let idx in apps) {
      const app = apps[idx]
      // map images to registry if not already mapped
      const names = Object.values(app.getImages())
      for (let name of names) {
        if (!images.find(renaming => renaming.name === name)) {
          if (cluster.registry && cluster.imageTag && !name.includes('/')) {
            images.push({ name, newName: `${cluster.registry}/${name}`, newTag: cluster.imageTag })
          } else if (cluster.registry && !name.includes('/')) {
            images.push({ name, newName: `${cluster.registry}/${name}` })
          } else if (cluster.imageTag) {
            images.push({ name, newTag: cluster.imageTag })
          }
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
        this._writeToFile(layer.patches[fname].patch, fname, layer.name)
      }
      for (let fname of Object.keys(layer.patchesJSON)) {
        this._writeToFile(layer.patchesJSON[fname].patch, fname, layer.name)
      }
      const kustom = {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        commonAnnotations: {
          'solsa.ibm.com/app': apps[0].name || 'bundle'
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

function main () {
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

  const outputRoot = argv.output ? argv.output : 'bundle'
  const sa = new SolsaArchiver(outputRoot)
  for (let idx in apps) {
    apps[idx].getResources(sa).forEach(({ obj, name, layer }) => sa.addResource(obj, name, layer))
  }
  sa.finalize(userConfig, apps)
}

main()
