const { Bundle } = require('./bundle')
const { Ingress } = require('./ingress')

function valueWrapForEnv (val) {
  if (val.valueFrom) return { valueFrom: val.valueFrom }
  if (val.value) return { value: val.value.toString() }
  return { value: val.toString() }
}

class ContainerizedService extends Bundle {
  constructor ({ name, image, env = {}, port, ports = [], build, main }) {
    super()
    this.name = name
    this.port = port
    this.ports = ports
    this.image = image
    this.build = build
    this.main = main
    this.env = env

    this.solsa.ports = ports
    if (port) {
      this.solsa.ports.unshift(port)
      this.env = Object.assign({ PORT: port }, this.env)
    }

    this.Ingress = class extends Ingress {
      constructor ({ endpoints } = {}) {
        super({ name, port, endpoints })
      }
    }
  }

  getAllResources () {
    const env = []
    for (let key in this.env) {
      env.push(Object.assign({ name: key }, this.env[key]))
    }

    const deployment = {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: this.name
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: { 'solsa.ibm.com/pod': this.name }
        },
        template: {
          metadata: {
            labels: { 'solsa.ibm.com/pod': this.name }
          },
          spec: {
            containers: [{
              name: this.name,
              image: this.image,
              ports: this.solsa.ports.map(containerPort => ({ containerPort })),
              env: Object.keys(this.env).map(key => Object.assign({ name: key }, valueWrapForEnv(this.env[key])))
            }]
          }
        }
      }
    }

    const svc = {
      apiVersion: 'v1',
      kind: 'Service',
      metadata: {
        name: this.name
      },
      spec: {
        type: 'ClusterIP',
        ports: this.solsa.ports.map(port => ({ port })),
        selector: { 'solsa.ibm.com/pod': this.name }
      }
    }

    return [{ obj: deployment, name: this.name + '-deployment.yaml' }, { obj: svc, name: this.name + '-svc.yaml' }]
  }

  getAllImages () {
    return [this.image]
  }

  getAllBuilds () {
    return this.build ? [{ name: this.image, build: this.build, main: this.main }] : []
  }
}

module.exports = { ContainerizedService }
