const Events = require('events')
const needle = require('needle')

const PORT = 8080

function genLabels (svc) {
  return {
    'solsa.ibm.com/name': svc.name
  }
}

function solsaImage (str) {
  return 'solsa-' + str.toLowerCase()
}

function isKubernetes (target) {
  return target === 'kubernetes'
}

function isKNative (target) {
  return target === 'knative'
}

let solsa = {
  Service: class Service {
    static make () {
      let svc = new this(...arguments)
      svc.solsa.options.push(...arguments)
      if (svc.solsa.raw) return svc

      for (let key of Object.getOwnPropertyNames(svc.constructor.prototype).filter(name => name !== 'constructor')) {
        svc[key] = async function () {
          return needle('post', (process.env.SOLSA_URL || `http://${svc.name}:${PORT}`) + '/' + key, arguments[0], { json: true })
            .then(result => result.body)
        }
      }

      for (let event of svc.events.eventNames()) {
        svc.events.removeAllListeners(event)
        svc.events.on(event, function () {
          needle('post', (process.env.SOLSA_URL || `http://${svc.name}:${PORT}`) + '/' + event, arguments[0], { json: true })
        })
      }

      return svc
    }

    constructor (name, raw) {
      this.name = name
      this.events = new Events()
      this.solsa = { raw, dependencies: [], secrets: {}, options: [] }
    }

    addDependency (dep) {
      this.solsa.dependencies.push(dep)
      return dep
    }

    addSecret (name, key) {
      let v = `SOLSA_${name}_SOLSA_${key}`.toUpperCase().replace(/-/g, '_')
      this.solsa.secrets[v] = { valueFrom: { secretKeyRef: { name, key } } }
      return process.env[v]
    }

    async _yaml (archive, target) {
      let env = {
        SOLSA_NAME: { value: this.name },
        SOLSA_OPTIONS: { value: JSON.stringify(this.solsa.options) }
      }
      for (let svc of this.solsa.dependencies) {
        await svc._yaml(archive, target)
        for (let k of Object.keys(svc.solsa.secrets)) {
          env[k] = svc.solsa.secrets[k]
        }
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
                  image: solsaImage(this.constructor.name),
                  imagePullPolicy: 'IfNotPresent',
                  ports: [{ name: 'solsa', containerPort: PORT }],
                  env: Object.keys(env).map(key => Object.assign({ name: key }, env[key])),
                  livenessProbe: {
                    tcpSocket: {
                      port: PORT
                    }
                  },
                  readinessProbe: {
                    httpGet: {
                      path: '/solsa/readinessProbe',
                      port: PORT
                    }
                  }
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
                      image: solsaImage(this.constructor.name),
                      env: Object.keys(env).map(key => Object.assign({ name: key }, env[key]))
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
      let options = JSON.parse(process.env.SOLSA_OPTIONS)

      let svc = new this(...options)

      let express = require('express')
      let app = express()
      app.use(express.json())

      for (let key of Object.getOwnPropertyNames(this.prototype).filter(name => name !== 'constructor')) {
        app.post('/' + key, (request, response) => {
          svc[key](request.body).then(r => response.send(r), err => response.status(500).send(err.message || err.toString() || 'Internal error'))
        })
      }

      for (let key of svc.events.eventNames()) {
        app.post('/' + key, (request, response) => {
          svc.events.emit(key, request.body)
          response.status(202).send('ACCEPTED')
        })
      }

      app.get('/solsa/readinessProbe', (_request, response) => {
        response.status(200).send('OK')
      })

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
