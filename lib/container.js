const { Bundle } = require('./bundle')
const { Ingress } = require('./ingress')

function valueWrapForEnv (val) {
  if (val.valueFrom) return { valueFrom: val.valueFrom }
  if (val.value) return { value: val.value.toString() }
  return { value: val.toString() }
}

class ContainerizedService extends Bundle {
  constructor ({ name, image, env = {}, ports = [8080], build, main }) {
    super()
    if (typeof ports === 'number') {
      this.env = Object.assign({ 'PORT': ports }, env)
    } else if (ports.length === 1 && typeof ports[0] === 'number') {
      this.env = Object.assign({ 'PORT': ports[0] }, env)
    } else {
      this.env = env
    }
    this.name = name
    this.ports = ports
    this.image = image
    this.build = build
    this.main = main

    this.Ingress = class extends Ingress {
      constructor ({ endpoints } = {}) {
        super({ name, ports, endpoints })
      }
    }
  }

  getAllResources () {
    const env = []
    for (let key in this.env) {
      env.push(Object.assign({ name: key }, this.env[key]))
    }

    let ports = this.ports
    if (typeof ports === 'number') ports = [ports]
    if (typeof ports === 'object' && !Array.isArray(ports)) ports = Object.values(ports)

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
              image: this.image,
              ports: ports.map(containerPort => ({ containerPort })),
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
        name: this.name,
        labels: { 'solsa.ibm.com/name': this.name }
      },
      spec: {
        type: 'ClusterIP',
        ports: ports.map(port => ({ port })),
        selector: { 'solsa.ibm.com/name': this.name }
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
