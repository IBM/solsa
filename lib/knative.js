const { Bundle } = require('./bundle')

class KnativeService extends Bundle {
  constructor ({ name, image, env = {}, ports = { http: 8080 }, build, main }) {
    super()
    this.name = name
    this.ports = ports
    this.image = image
    this.env = env
    this.build = build
    this.main = main
  }

  getAllResources () {
    const obj = {
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
                  env: Object.keys(this.env).map(name => Object.assign({ name }, this.env[name])),
                  ports: Object.values(this.ports).map(containerPort => ({ name: 'http1', containerPort }))
                }
              }
            }
          }
        }
      }
    }
    return [{ obj, name: this.name + '-service-knative.yaml' }]
  }

  getAllImages () {
    return [this.image]
  }

  getAllBuilds () {
    return this.build ? [{ name: this.image, build: this.build, main: this.main }] : []
  }
}

module.exports = { KnativeService }
