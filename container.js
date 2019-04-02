let solsa = require('./solsa')

let container = {
  Service: class Service extends solsa.Service {
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
          labels: { 'solsa.ibm.com/name': this.name }
        },
        spec: {
          type: 'ClusterIP',
          ports: [{ name: 'solsa', port: this.port }],
          selector: { 'solsa.ibm.com/name': this.name }
        }
      }
      archive.addResource(svc, this.name + '-svc.yaml', 'kubernetes')
    }
  },

  MultiVersionService: class MultiVersionService extends solsa.Service {
    constructor (solsaServiceArgs, versions) {
      super(solsaServiceArgs, true)
      this.versions = versions
    }

    async _yaml (archive) {
      for (let svc of this.solsa.dependencies) {
        await svc._yaml(archive)
      }

      for (let idx in this.versions) {
        let version = this.versions[idx]
        const deployment = {
          apiVersion: 'apps/v1',
          kind: 'Deployment',
          metadata: {
            name: `${this.name}-${version.version}`,
            labels: { 'solsa.ibm.com/name': this.name, 'version': version.version }
          },
          spec: {
            replicas: 1,
            selector: {
              matchLabels: { 'solsa.ibm.com/name': this.name }
            },
            template: {
              metadata: {
                labels: { 'solsa.ibm.com/name': this.name, 'version': version.version }
              },
              spec: {
                containers: [{
                  name: this.name,
                  image: version.image,
                  ports: [{ name: 'solsa', containerPort: this.port }]
                }]
              }
            }
          }
        }
        archive.addResource(deployment, `${this.name}-${version.version}-deployment.yaml`, 'kubernetes')
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
          ports: [{ name: 'solsa', port: this.port }],
          selector: { 'solsa.ibm.com/name': this.name }
        }
      }
      archive.addResource(svc, this.name + '-svc.yaml', 'kubernetes')
    }
  }
}

module.exports = container
