const needle = require('needle')
let yaml = require('js-yaml')

const PORT = 8080

function genLabels (svc) {
  return {
    'solsa.ibm.com/name': svc.name
  }
}

function isKubernetes (target) {
  return target === 'kubernetes'
}

function isKNative (target) {
  return target === 'knative'
}

let solsa = {
  Service: class Service {
    constructor (name) {
      if (name !== undefined) {
        for (let key of Object.getOwnPropertyNames(this.constructor.prototype).filter(name => name !== 'constructor')) {
          this[key] = async function () {
            // return { request: `${name}.${key} ${JSON.stringify(arguments[0])}` }
            return needle('post', `https://${name}.${process.env.CLUSTER_INGRESS_SUBDOMAIN}/${key}`, arguments[0], { json: true })
              .then(result => result.body)
          }
        }
        this.name = name
      }
    }

    _helm (archive, target, templateDir, ingress) {
      Object.keys(this.dep).map(key => this.dep[key]._helm(archive, target, templateDir)).reduce((x, y) => x.concat(y), [])

      if (isKubernetes(target)) {
        const deployment = {
          apiVersion: 'apps/v1',
          kind: 'Deployment',
          metadata: {
            name: this.name,
            labels: genLabels(this)
          },
          spec: {
            replicas: 1,
            selector: {
              matchLabels: genLabels(this)
            },
            template: {
              metadata: {
                labels: genLabels(this)
              },
              spec: {
                containers: [{
                  name: this.name,
                  image: '{{ .Values.solsa.docker.registry }}/' + 'solsa-' + this.constructor.name.toLowerCase(),
                  ports: [{ containerPort: PORT }],
                  env: Object.keys(this.env).map(key => Object.assign({ name: key }, this.env[key]))
                }]
              }
            }
          }
        }
        archive.append(yaml.safeDump(deployment, { noArrayIndent: true }),
          { name: templateDir + this.name + '-deployment' })

        const svc = {
          apiVersion: 'v1',
          kind: 'Service',
          metadata: {
            name: this.name,
            labels: genLabels(this)
          },
          spec: {
            type: 'ClusterIP',
            ports: [{
              'port': PORT
            }],
            selector: genLabels(this)
          }
        }
        archive.append(yaml.safeDump(svc, { noArrayIndent: true }),
          { name: templateDir + this.name + '-svc' })

        if (ingress) {
          const ingress = {
            apiVersion: 'extensions/v1beta1',
            kind: 'Ingress',
            metadata: {
              name: this.name,
              labels: genLabels(this)
            },
            spec: {
              tls: [{
                hosts: [
                  this.name + '.{{ .Values.solsa.ingress.subdomain }}'
                ],
                secretName: '{{ .Values.solsa.ingress.secret }}'
              }],
              rules: [{
                host: this.name + '.{{ .Values.solsa.ingress.subdomain }}',
                http: {
                  paths: [{
                    path: '/',
                    backend: {
                      serviceName: this.name,
                      servicePort: PORT
                    }
                  }]
                }
              }]
            }
          }
          archive.append(yaml.safeDump(ingress, { noArrayIndent: true }),
            { name: templateDir + this.name + '-ingress' })
        }
      } else if (isKNative(target)) {
        const svc = {
          apiVersion: 'serving.knative.dev/v1alpha1',
          kind: 'Service',
          metadata: {
            name: this.name
          },
          spec: {
            runLatest: {
              configuration: {
                revisionTemplate: {
                  spec: {
                    container: {
                      image: '{{ .Values.solsa.docker.registry }}/' + 'solsa-' + this.constructor.name.toLowerCase(),
                      env: Object.keys(this.env).map(key => Object.assign({ name: key }, this.env[key]))
                    }
                  }
                }
              }
            }
          }
        }
        archive.append(yaml.safeDump(svc, { noArrayIndent: true }),
          { name: templateDir + this.name + '-svc' })
      }
    }

    static serve () {
      let service = new this()

      for (let key of Object.keys(service.env)) {
        service.env[key] = process.env[key]
      }

      let express = require('express')
      let app = express()
      app.use(express.json())

      for (let key of Object.getOwnPropertyNames(this.prototype).filter(name => name !== 'constructor')) {
        app.post('/' + key, (request, response) => {
          service[key](request.body).then(r => response.send(r), err => response.send(err))
        })
      }

      app.listen(PORT, err => {
        if (err) {
          console.log(err)
        } else {
          console.log(`server is listening on ${PORT}`)
        }
      })
    }
  }
}

module.exports = solsa
