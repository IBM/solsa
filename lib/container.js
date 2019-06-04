const { Bundle } = require('./bundle')
const { enumerate } = require('../helpers')
const { Ingress } = require('./ingress')

class ContainerizedService extends Bundle {
  constructor ({ name, image, env = {}, port, ports = [], replicas = 1, labels = {}, annotations = {}, build, main }) {
    super()
    this.name = name
    this.image = image
    this.env = env
    this.port = port
    this.ports = ports
    this.replicas = replicas
    this.labels = labels
    this.annotations = annotations
    this.build = build
    this.main = main

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
        replicas: this.replicas,
        selector: {
          matchLabels: { 'solsa.ibm.com/pod': this.name }
        },
        template: {
          metadata: {
            labels: Object.assign({ 'solsa.ibm.com/pod': this.name }, this.labels)
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
    if (this.annotations) {
      deployment.spec.template.metadata.annotations = this.annotations
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
      if (this.annotations) {
        svc.metadata.annotations = this.annotations
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
