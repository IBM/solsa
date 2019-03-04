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
            // return { request: `${name}.${key} ${JSON.stringify(arguments[0])}` }
            return needle('post', `https://${name}.${process.env.CLUSTER_INGRESS_SUBDOMAIN}/${key}`, arguments[0], { json: true })
              .then(result => result.body)
          }
        }
        this.name = name
      }
    }

    _yaml (target) {
      let array = Object.keys(this.dep).flatMap(key => this.dep[key]._yaml(target))
      if (isKubernetes(target)) {
        array.push({
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
                  image: (process.env.REGISTRY ? process.env.REGISTRY + '/' : '') + 'solsa-' + this.constructor.name.toLowerCase(),
                  ports: [{ containerPort: PORT }],
                  env: Object.keys(this.env).map(key => Object.assign({ name: key }, this.env[key]))
                }]
              }
            }
          }
        })

        array.push({
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
        })
      } else if (isKNative(target)) {
        array.push({
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
                      image: (process.env.REGISTRY ? process.env.REGISTRY + '/' : '') + 'solsa-' + this.constructor.name.toLowerCase(),
                      env: Object.keys(this.env).map(key => Object.assign({ name: key }, this.env[key]))
                    }
                  }
                }
              }
            }
          }
        })
      }

      return array
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
