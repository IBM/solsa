const { Bundle } = require('./bundle')

function valueWrapForEnv (val) {
  if (val.valueFrom) return { valueFrom: val.valueFrom }
  if (val.value) return { value: val.value.toString() }
  return { value: val.toString() }
}

class Service extends Bundle {
  constructor ({ name, image, env, build, main }) {
    super()
    this.name = name
    this.image = image
    this.env = env
    this.build = build
    this.main = main

    const that = this

    this.Ingress = class extends Bundle {
      constructor () {
        super()
        that.ingress = true
      }
    }
  }

  getAllResources () {
    const container = { image: this.image }
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
                container
              }
            }
          }
        }
      }
    }
    if (!this.ingress) obj.metadata.labels = { 'serving.knative.dev/visibility': 'cluster-local' }
    if (this.env) container.env = Object.keys(this.env).map(key => Object.assign({ name: key }, valueWrapForEnv(this.env[key])))
    return [{ obj, name: this.name + '-service-knative.yaml' }]
  }

  getAllImages () {
    return [this.image]
  }

  getAllBuilds () {
    return this.build ? [{ name: this.image, build: this.build, main: this.main }] : []
  }
}

class KnativeService extends Service { }

class KafkaSource extends Bundle {
  constructor ({ name, consumerGroup = name, bootstrapServers, topics = name, user, password, sink }) {
    super()
    this.name = name
    this.consumerGroup = consumerGroup
    this.bootstrapServers = bootstrapServers
    this.topics = topics
    this.user = user
    this.password = password
    this.sink = sink
  }

  getAllResources () {
    const obj = {
      apiVersion: 'ibmcloud.ibm.com/v1alpha1',
      kind: 'Composable',
      metadata: {
        name: this.name
      },
      spec: {
        template: {
          apiVersion: 'sources.eventing.knative.dev/v1alpha1',
          kind: 'KafkaSource',
          metadata: {
            name: this.name
          },
          spec: {
            consumerGroup: this.consumerGroup,
            bootstrapServers: this.bootstrapServers,
            topics: this.topics,
            net: {
              sasl: {
                enable: true,
                user: this.user,
                password: this.password
              },
              tls: {
                enable: true
              }
            },
            sink: {
              apiVersion: 'serving.knative.dev/v1alpha1',
              kind: 'Service',
              name: this.sink.name
            }
          }
        }
      }
    }
    return [{ obj, name: this.name + '-kafka-source.yaml' }]
  }
}

module.exports = { knative: { KafkaSource, Service }, KnativeService }
