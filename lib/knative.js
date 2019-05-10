const { Service } = require('./bundle')

class KnativeService extends Service {
  constructor ({ name, image, env = {}, ports, build, main }) {
    super({ name, ports })
    this.image = image
    this.env = env
    this.build = build
    this.main = main
  }

  getAllResources () {
    const env = []
    for (let key in this.env) {
      env.push(Object.assign({ name: key }, this.env[key]))
    }

    const ports = []
    for (let key in this.ports) {
      ports.push({ name: 'http1', containerPort: this.ports[key] })
    }

    const svc = {
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
                  image: this.image,
                  env,
                  ports
                }
              }
            }
          }
        }
      }
    }
    return [{ obj: svc, name: this.name + '-svc.yaml', layer: 'knative' }]
  }

  getAllImages () {
    return [this.image]
  }

  getAllBuilds () {
    return this.build ? [{ name: this.image, build: this.build, main: this.main }] : []
  }
}

module.exports = { KnativeService }
