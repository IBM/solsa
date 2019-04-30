const callSites = require('callsites')
const Events = require('events')
const fs = require('fs')
const needle = require('needle')
const os = require('os')
const path = require('path')
const pkgDir = require('pkg-dir')
const yaml = require('js-yaml')

function solsaImage (str) {
  return 'solsa-' + str.toLowerCase()
}

global.__level = global.__level || 0
global.__count = global.__count || 0

let solsa = {
  Service: class Service {
    static make () {
      // console.log(' '.repeat(global.__level) + 'make', this.name)
      if (!global.__yaml && global.__level) return null
      global.__level++
      let svc = new this(...arguments)
      global.__level--
      if (!global.__level) {
        svc.solsa.rank = global.__count++
      }
      svc.solsa.options.push(...arguments)
      if (svc.solsa.raw || global.__yaml) return svc

      let url
      const filename = process.env.SOLSA_CONFIG || path.join(os.homedir(), '.solsa.yaml')
      const config = fs.existsSync(filename) ? yaml.safeLoad(fs.readFileSync(filename, 'utf8')) : {}
      const cluster = (config.clusters || []).find(cluster => cluster.name === process.env.SOLSA_CLUSTER) || {}
      if (cluster.ingress && cluster.ingress.nodePort) {
        url = `http://localhost:${cluster.ingress.nodePort + svc.solsa.rank}`
      } else if (cluster.ingress && cluster.ingress.iks && cluster.ingress.iks.subdomain) {
        if (cluster.nature === 'knative') {
          url = `http://${svc.name}.default.${cluster.ingress.iks.subdomain}`
        } else {
          url = `https://${svc.name}.${cluster.ingress.iks.subdomain}`
        }
      } else {
        url = `http://${svc.name}:${svc.port}`
      }

      for (let key of Object.getOwnPropertyNames(svc.constructor.prototype).filter(name => name !== 'constructor')) {
        svc[key] = async function () {
          return needle('post', url + '/' + key, arguments[0], { json: true })
            .then(result => result.body)
        }
      }

      for (let event of svc.events.eventNames()) {
        svc.events.removeAllListeners(event)
        svc.events.on(event, function () {
          needle('post', url + '/' + event, arguments[0], { json: true })
        })
      }

      return svc
    }

    constructor (solsaServiceArgs, raw, file = callSites()[1].getFileName()) {
      // console.log(' '.repeat(global.__level) + 'new', this.constructor.name)
      if (typeof solsaServiceArgs === 'string') {
        this.name = solsaServiceArgs
        this.port = 8080
      } else {
        this.name = solsaServiceArgs.name
        this.port = solsaServiceArgs.port || 8080
      }
      this.events = new Events()
      this.solsa = { raw, serviceReady: false, dependencies: [], secrets: {}, options: [], file }
    }

    async initializeService () {
      this.serviceReady = true
    }

    addDependency (dep) {
      if (dep) {
        this.solsa.dependencies.push(dep)
        dep.solsa.parent = this
      }
      return dep
    }

    addSecret (name, key) {
      let v = `SOLSA_${name}_SOLSA_${key}`.toUpperCase().replace(/-/g, '_')
      this.solsa.secrets[v] = { valueFrom: { secretKeyRef: { name, key } } }
      return process.env[v]
    }

    _exposedServices () { return [{ name: this.name, service: this }] }

    _images () {
      if (this.solsa.raw) return {}
      const me = {}
      me[this.constructor.name] = { name: solsaImage(this.constructor.name), dir: pkgDir.sync(this.solsa.file) }
      return Object.assign(me, ...this.solsa.dependencies.filter(svc => svc._images).map(svc => svc._images()))
    }

    async _yamlMyDependencies (archive) {
      let env = { SOLSA_OPTIONS: { value: JSON.stringify(this.solsa.options) }, SOLSA_PORT: { value: `${this.port}` } }
      for (let k of Object.keys(this.solsa.secrets)) {
        env[k] = this.solsa.secrets[k]
      }
      for (let svc of this.solsa.dependencies) {
        await svc._yaml(archive)
        for (let k of Object.keys(svc.solsa.secrets)) {
          env[k] = svc.solsa.secrets[k]
        }
      }
      return env
    }

    async _yaml (archive) {
      let env = await this._yamlMyDependencies(archive)

      if (Object.getOwnPropertyNames(this.constructor.prototype).filter(name => name !== 'constructor').length === 0) return

      const deployment = {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: this.name,
          labels: { 'solsa.ibm.com/name': this.name }
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: { 'solsa.ibm.com/name': this.name }
          },
          template: {
            metadata: {
              labels: { 'solsa.ibm.com/name': this.name }
            },
            spec: {
              containers: [{
                name: this.name,
                image: solsaImage(this.constructor.name),
                ports: [{ name: 'solsa', containerPort: this.port }],
                env: Object.keys(env).map(key => Object.assign({ name: key }, env[key])),
                livenessProbe: {
                  tcpSocket: {
                    port: this.port
                  }
                },
                readinessProbe: {
                  httpGet: {
                    path: '/solsa/readinessProbe',
                    port: this.port
                  }
                }
              }]
            }
          }
        }
      }
      archive.addResource(deployment, this.name + '-deployment.yaml', 'kubernetes')

      const svc = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: this.name,
          labels: { 'solsa.ibm.com/name': this.name }
        },
        spec: {
          type: 'ClusterIP',
          ports: [{ name: 'solsa', port: this.port }],
          selector: { 'solsa.ibm.com/name': this.name }
        }
      }
      archive.addResource(svc, this.name + '-svc.yaml', 'kubernetes')

      const ksvc = {
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
      archive.addResource(ksvc, this.name + '-svc.yaml', 'knative')
    }

    static serve () {
      let options = JSON.parse(process.env.SOLSA_OPTIONS || '[]')
      let port = parseInt(process.env.SOLSA_PORT, 10)

      let svc = new this(...options)

      svc.initializeService()

      let express = require('express')
      let app = express()
      app.use(express.json())

      for (let key of Object.getOwnPropertyNames(this.prototype).filter(name => name !== 'constructor')) {
        app.post('/' + key, (request, response) => {
          Promise.resolve().then(() => svc[key](request.body)).then(r => response.send(r), err => response.status(500).send((err && err.message) || 'Internal error'))
        })
      }

      for (let key of svc.events.eventNames()) {
        app.post('/' + key, (request, response) => {
          Promise.resolve().then(() => svc.events.emit(key, request.body)).then(() => response.status(200).send('OK'), err => response.status(500).send((err && err.message) || 'Internal error'))
        })
      }

      app.get('/solsa/readinessProbe', (_request, response) => {
        if (svc.serviceReady) {
          response.status(200).send('OK')
        } else {
          response.status(503).send('Service not ready')
        }
      })

      app.post('/', (request, response) => {
        Promise.resolve().then(() => {
          svc.events.emit(request.body.event || 'any', request.body.payload)
        }).then(() => response.status(200).send('OK'), err => response.status(500).send((err && err.message) || 'Internal error'))
      })

      app.listen(port, err => {
        if (err) {
          console.error(err)
        } else {
          console.log(`server is listening on ${port}`)
        }
      })
    }
  }
}

solsa.Assembly = class Assembly extends solsa.Service {
  constructor (name) {
    super(name, true)
    this.exposedServices = []
  }

  addIngress (service, paths = ['/']) {
    if (service instanceof solsa.Service) {
      this.exposedServices.push({ name: this.name, service: service, paths: paths })
    } else {
      this.exposedServices.push(service)
    }
  }

  _images () {
    const me = {}
    return Object.assign(me, ...this.solsa.dependencies.filter(svc => svc._images).map(svc => svc._images()))
  }

  _exposedServices () {
    return this.exposedServices
  }

  async _yaml (archive) {
    await this._yamlMyDependencies(archive)
  }
}

solsa.Job = class Job extends solsa.Service {
  constructor (name, raw, file = callSites()[1].getFileName()) {
    super(name, raw, file)
    this.name = name
  }

  _exposedServices () { return [] }

  async _yaml (archive) {
    let env = await this._yamlMyDependencies(archive)

    const job = {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: this.name,
        labels: { 'solsa.ibm.com/name': this.name }
      },
      spec: {
        template: {
          metadata: {
            name: this.name,
            labels: { 'solsa.ibm.com/name': this.name }
          },
          spec: {
            restartPolicy: 'Never',
            containers: [{
              name: this.name,
              image: solsaImage(this.constructor.name),
              env: Object.keys(env).map(key => Object.assign({ name: key }, env[key]))
            }]
          }
        }
      }
    }
    archive.addResource(job, this.name + '-job.yaml')
  }

  async myTask () {
    console.log('Executed Job.myTask()')
  }

  static async serve () {
    let options = JSON.parse(process.env.SOLSA_OPTIONS || '[]')
    let svc = new this(...options)
    await svc.myTask()
  }
}

module.exports = solsa
