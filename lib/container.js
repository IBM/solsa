const { Bundle } = require('./bundle')
const { enumerate } = require('../helpers')
const { Ingress } = require('./ingress')

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

    this.Ingress = class extends Ingress {
      constructor ({ endpoints } = {}) {
        super({ name, port, endpoints })
      }
    }
  }

  getAllResources () {
    const ports = this.port ? [this.port].concat(this.ports) : this.ports
    const env = this.port ? Object.assign({ PORT: this.port }, this.env) : this.env

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
              ports: ports.map(containerPort => ({ containerPort })),
              env: enumerate(env)
            }]
          }
        }
      }
    }

    const objs = [{ obj: deployment, name: this.name + '-deployment.yaml' }]

    if (ports.length > 0) {
      const svc = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: this.name
        },
        spec: {
          type: 'ClusterIP',
          ports: ports.map(port => ({ port })),
          selector: { 'solsa.ibm.com/pod': this.name }
        }
      }
      objs.push({ obj: svc, name: this.name + '-svc.yaml' })
    }

    return objs
  }

  getAllImages () {
    return [this.image]
  }

  getAllBuilds () {
    return this.build ? [{ name: this.image, build: this.build, main: this.main }] : []
  }
}

module.exports = { ContainerizedService }
