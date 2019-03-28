#!/usr/bin/env node

const archiver = require('archiver')
const fs = require('fs')
const minimist = require('minimist')
const os = require('os')
const path = require('path')
const yaml = require('js-yaml')

class SolsaArchiver {
  constructor (app, outputRoot) {
    this.app = app
    var output = fs.createWriteStream(outputRoot + '.tgz')
    this.archive = archiver('tar', {
      gzip: true,
      zlib: { level: 9 }
    })
    this.files = []
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

  addYaml (obj, fname, layer = 'base') {
    this.archive.append(yaml.safeDump(obj, { noArrayIndent: true }),
      { name: path.join(this.outputRoot, layer, fname) })
    this.files.push({ fname, layer })
  }

  addKustomizeYaml (obj, fname, layer = 'base') {
    this.archive.append(yaml.safeDump(obj, { noArrayIndent: true }),
      { name: path.join(this.outputRoot, layer, fname) })
  }

  _finalizeIngress (cluster, additionalFiles, jsonPatches) {
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
      this.addKustomizeYaml(ingress, 'ingress.yaml', cluster.name)
      additionalFiles.push('ingress.yaml')

      // NOTHING TO DO FOR Knative (Ingress automatically configured for KNative Services on IKS)
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
        this.addKustomizeYaml(nodePortPatch, 'expose-svc.yaml', cluster.name)
        jsonPatches.push({
          target: {
            version: 'v1',
            kind: 'Service',
            name: this.app.name
          },
          path: 'expose-svc.yaml'
        })
      }
      if ((cluster.nature || 'kubernetes').toLowerCase() === 'knative') {
        console.log(`Warning for cluster ${cluster.name}: NodePort Ingress is not supported with Knative target`)
      }
    }
  }

  _finalizeImageRenames (cluster, additionalFiles, jsonPatches) {
    if (!cluster.images) return []
    // NOTE: This assumes a patch to Kustomize that has not yet been merged upstream
    return cluster.images
  }

  finalize (userConfig) {
    const layers = {}
    for (let entry of this.files) layers[entry.layer] = [entry.fname].concat(layers[entry.layer] || [])
    for (let layer of Object.keys(layers)) {
      const kustom = {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        commonAnnotations: {
          'solsa.ibm.com/app': this.app.name
        },
        resources: layers[layer]
      }
      this.addKustomizeYaml(kustom, 'kustomization.yaml', layer)
    }

    if (userConfig.clusters) {
      for (const cluster of userConfig.clusters) {
        const additionalFiles = []
        const jsonPatches = []

        if (cluster.ingress) {
          this._finalizeIngress(cluster, additionalFiles, jsonPatches)
        }
        const images = this._finalizeImageRenames(cluster, additionalFiles, jsonPatches)

        const kc = {
          apiVersion: 'kustomize.config.k8s.io/v1beta1',
          kind: 'Kustomization',
          bases: ['./../base', `./../${cluster.nature || 'kubernetes'}`],
          resources: additionalFiles,
          patchesJson6902: jsonPatches,
          images: images
        }
        this.addKustomizeYaml(kc, 'kustomization.yaml', cluster.name)
      }
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
  if (argv.output === undefined) {
    argv.output = 'solsa-' + theApp.name.toLowerCase()
  }

  const sa = new SolsaArchiver(theApp, argv.output)
  await theApp._yaml(sa)
  sa.finalize(userConfig)
}

global.__yaml = true

main()
