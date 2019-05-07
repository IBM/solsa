const { addResource, Service } = require('../solsa')

class KnativeService extends Service {
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
    addResource(resources, svc, this.name + '-svc.yaml', 'knative')

    return resources
  }

  getAllImages () {
    return [this.image]
  }
}

class ExpressKnativeService extends KnativeService {
  constructor ({ name, image, env = {}, ports = {}, folder, main }) {
    super({ name, image, env, ports })
    this.folder = folder
    this.main = main
  }

  getAllBuilds () {
    const builds = {}
    builds[this.image] = { folder: this.folder, main: this.main }
    return builds
  }
}

module.exports = { KnativeService, ExpressKnativeService }
