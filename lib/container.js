const { addResource, Service } = require('../solsa')

class ContainerizedService extends Service {
  constructor ({ name, image, env, ports }) {
    super()
    this.name = name
    this.image = image
    this.env = env
    this.ports = ports
  }

  getAllResources () {
    const resources = {}

    const env = []
    for (let key in this.env) {
      env.push(Object.assign({ name: key }, this.env[key]))
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
              ports: [{ name: 'solsa', containerPort: this.port }],
              env: Object.keys(this.env).map(key => Object.assign({ name: key }, valueWrap(this.env[key])))
            }]
          }
        }
      }
    }
    addResource(deployment, this.name + '-deployment.yaml', 'base')

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
    addResource(svc, this.name + '-svc.yaml', 'base')

    return resources
  }

  getAllImages () {
    return [this.image]
  }
}

module.exports = { ContainerizedService }
