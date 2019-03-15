#!/usr/bin/env node

let yaml = require('js-yaml')
const minimist = require('minimist')
const fs = require('fs')
const archiver = require('archiver')

class SolsaArchiver {
  constructor (app, archiveName) {
    this.app = app
    var output = fs.createWriteStream(archiveName + '.tar.gz')
    this.archive = archiver('tar', {
      gzip: true,
      zlib: { level: 9 }
    })
    this.files = []

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.log('archiver has been finalized and the output file descriptor has closed.')
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

  addYaml (obj, fname) {
    this.archive.append(yaml.safeDump(obj, { noArrayIndent: true }),
      { name: 'solsa-' + this.app.name.toLowerCase() + '/base/' + fname })
    this.files.push(fname)
  }

  addKustomizeYaml (obj, path, fname) {
    this.archive.append(yaml.safeDump(obj, { noArrayIndent: true }),
      { name: 'solsa-' + this.app.name.toLowerCase() + path + fname })
  }

  finalize (userConfig) {
    const kustom = {
      apiVersion: 'kustomize.config.k8s.io/v1beta1',
      kind: 'Kustomization',
      commonAnnotations: {
        'solsa.ibm.com/app': this.app.name
      },
      resources: this.files
    }
    this.addKustomizeYaml(kustom, '/base/', 'kustomization.yaml')

    if (userConfig.clusters) {
      for (const c of userConfig.clusters) {
        const additionalFiles = []
        const jsonPatches = []

        if (c.ingress) {
          if (c.ingress.iks) {
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
                    this.app.name + '.' + c.ingress.iks.subdomain
                  ],
                  secretName: c.ingress.iks.tlssecret
                }],
                rules: [{
                  host: this.app.name + '.' + c.ingress.iks.subdomain,
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
            this.addKustomizeYaml(ingress, '/' + c.name + '/', 'ingress.yaml')
            additionalFiles.push('ingress.yaml')
          } else if (c.ingress.nodePort) {
            const nodePortPatch = [
              {
                op: 'replace',
                path: '/spec/type',
                value: 'NodePort'
              }, {
                op: 'add',
                path: '/spec/ports/0/nodePort',
                value: c.ingress.nodePort
              }
            ]
            this.addKustomizeYaml(nodePortPatch, '/' + c.name + '/', 'expose-svc.yaml')
            jsonPatches.push({
              target: {
                version: 'v1',
                kind: 'Service',
                name: this.app.name
              },
              path: 'expose-svc.yaml'
            })
          }
        }

        const kc = {
          apiVersion: 'kustomize.config.k8s.io/v1beta1',
          kind: 'Kustomization',
          bases: ['./../base'],
          resources: additionalFiles,
          patchesJson6902: jsonPatches,
          images: c.images ? c.images : []
        }
        this.addKustomizeYaml(kc, '/' + c.name + '/', 'kustomization.yaml')
      }
    }

    this.archive.finalize()
  }
}

async function main () {
  const argv = minimist(process.argv.slice(2), {
    default: { target: 'kubernetes', output: 'solsa-yaml', config: process.env.SOSLA_CONFIG },
    alias: { target: 't', output: 'o', config: 'c' },
    string: ['target', 'output', 'config']
  })

  var userConfig = {}
  if (argv.config) {
    userConfig = yaml.safeLoad(fs.readFileSync(argv.config, 'utf8'))
  }

  const theApp = require(require('path').resolve(argv._[0]))
  const sa = new SolsaArchiver(theApp, argv.output)
  await theApp._yaml(sa, argv.target)
  sa.finalize(userConfig)
}

main()
