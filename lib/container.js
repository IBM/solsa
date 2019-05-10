const { Service } = require('./bundle')

function valueWrap (val) {
  if (val.valueFrom) return { valueFrom: val.valueFrom }
  if (val.value) return { value: val.value }
  return { value: val }
}

class ContainerizedService extends Service {
  constructor ({ name, image, env = {}, ports }) {
    super({ name, ports })
    this.image = image
    this.env = env
  }

  getAllResources () {
    const env = []
    for (let key in this.env) {
      env.push(Object.assign({ name: key }, this.env[key]))
    }

    // FIXME: clean this up
    const deploymentPorts = []
    for (let key in this.ports) {
      deploymentPorts.push({ name: key, containerPort: this.ports[key] })
    }
    const servicePorts = []
    for (let key in this.ports) {
      servicePorts.push({ name: key, port: this.ports[key] })
    }

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
              ports: deploymentPorts,
              env: Object.keys(this.env).map(key => Object.assign({ name: key }, valueWrap(this.env[key])))
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
        ports: servicePorts,
        selector: { 'solsa.ibm.com/name': this.name }
      }
    }

    return [{ obj: deployment, name: this.name + '-deployment.yaml' }, { obj: svc, name: this.name + '-svc.yaml' }]
  }

  getAllImages () {
    return [this.image]
  }
}

class ExpressContainerizedService extends ContainerizedService {
  constructor ({ name, image, env, ports, folder, main }) {
    super({ name, image, env, ports })
    this.folder = folder
    this.main = main
  }

  getAllBuilds () {
    return [{ name: this.image, folder: this.folder, main: this.main }]
  }
}

module.exports = { ContainerizedService, ExpressContainerizedService }
