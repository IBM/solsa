const Events = require('events')
const needle = require('needle')

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
            return needle('post', (process.env.SOLSA_URL || `https://${name}.${process.env.CLUSTER_INGRESS_SUBDOMAIN}`) + '/' + key, arguments[0], { json: true })
              .then(result => result.body)
          }
        }
        this.name = name
      }

      let events = new Events()
      this.events = events

      if (name !== undefined) {
        (function hack () {
          events.once('newListener', key => {
            events.on(key, function () {
              needle('post', (process.env.SOLSA_URL || `https://${name}.${process.env.CLUSTER_INGRESS_SUBDOMAIN}`) + '/' + key, arguments[0], { json: true })
            })
            hack()
          })
        })()
      }
    }

    async _yaml (archive, target) {
      for (let key of Object.keys(this.dep)) {
        await this.dep[key]._yaml(archive, target)
      }

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
                  image: 'solsa-' + this.constructor.name.toLowerCase(),
                  imagePullPolicy: 'IfNotPresent',
                  ports: [{ name: 'solsa', containerPort: PORT }],
                  env: Object.keys(this.env).map(key => Object.assign({ name: key }, this.env[key]))
                }]
              }
            }
          }
        }
        archive.addYaml(deployment, this.name + '-deployment.yaml')

        const svc = {
          apiVersion: 'v1',
          kind: 'Service',
          metadata: {
            name: this.name,
            labels: genLabels(this)
          },
          spec: {
            type: 'ClusterIP',
            ports: [{ name: 'solsa', port: PORT }],
            selector: genLabels(this)
          }
        }
        archive.addYaml(svc, this.name + '-svc.yaml')
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
        archive.addYaml(svc, this.name + '-svc.yaml')
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

      for (let key of service.events.eventNames()) {
        app.post('/' + key, (request, response) => {
          service.events.emit(key, request.body)
          response.send('OK')
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
