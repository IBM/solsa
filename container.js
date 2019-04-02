let solsa = require('./solsa')

// FIXME: make genLabels an _genLabels method of solsa.Service
function genLabels (svc) {
  return {
    'solsa.ibm.com/name': svc.name
  }
}

let container = {
  Container: class Container extends solsa.Service {
    constructor (solsaServiceArgs, image) {
      super(solsaServiceArgs, true)
      this.image = image
    }

    async _yaml (archive) {
      for (let svc of this.solsa.dependencies) {
        await svc._yaml(archive)
      }

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
                image: this.image,
                ports: [{ name: 'solsa', containerPort: this.port }]
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
          labels: genLabels(this)
        },
        spec: {
          type: 'ClusterIP',
          ports: [{ name: 'solsa', port: this.port }],
          selector: genLabels(this)
        }
      }
      archive.addResource(svc, this.name + '-svc.yaml', 'kubernetes')
    }
  }
}

module.exports = container
