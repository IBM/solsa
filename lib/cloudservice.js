const { addResource, Bundle, Service } = require('../solsa')

class CloudService extends Bundle {
  constructor ({ name, service, plan, servicetype }) {
    super()
    this.name = name
    this.service = service
    this.plan = plan
    this.servicetype = servicetype

    this.Job = job(this) // inner class
  }

  getAllResources () {
    const resources = {}
    const svc = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Service',
      metadata: {
        name: this.name
      },
      spec: {
        service: this.service,
        plan: this.plan,
        servicetype: this.servicetype
      }
    }
    addResource(resources, svc, this.name + '-svc.yaml')
    const binding = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Binding',
      metadata: {
        name: `binding-${this.name}`
      },
      spec: {
        servicetype: this.servicetype,
        bindingFrom: {
          name: this.name
        }
      }
    }
    addResource(resources, binding, this.name + '-binding.yaml')
    return resources
  }
}

class StreamingAnalytics extends CloudService {
  constructor ({ name, plan = 'lite' }) {
    super({ name, plan, service: 'streaming-analytics', servicetype: 'IAM' })

    this.Job = job(this) // inner class
  }
}

function job (streamingAnalytics) {
  return class Job extends Service {
    constructor ({ name, uri }) {
      super()
      this.name = name
      this.uri = uri
    }

    getConfig () {
      return { url: { valueFrom: { secretKeyRef: { name: 'config-' + this.name, key: 'url' } } } }
    }

    getAllResources () {
      const resources = {}
      const job = {
        apiVersion: 'streams.seed.ibm.com/v1beta1',
        kind: 'Stream',
        metadata: {
          name: this.name
        },
        spec: {
          type: 'ibm-streams',
          language: 'sab',
          serviceInstance: streamingAnalytics.name,
          codeUri: this.uri
        }
      }
      addResource(resources, job, this.name + '-streamsjob.yaml')
      return resources
    }
  }
}

class EventStreams extends CloudService {
  constructor ({ name, plan = 'standard' }) {
    super({ name, plan, service: 'messagehub' })

    this.Topic = topic(this) // inner class
  }

  getConfig () {
    const name = 'binding-' + this.name
    return {
      user: { valueFrom: { secretKeyRef: { name, key: 'user' } } },
      password: { valueFrom: { secretKeyRef: { name, key: 'password' } } },
      kafka_brokers_sasl: { valueFrom: { secretKeyRef: { name, key: 'kafka_brokers_sasl' } } }
    }
  }
}

function topic (eventStreams) {
  return class Topic extends Bundle {
    constructor ({ name, topicName }) {
      super()
      this.name = name
      this.topicName = topicName

      // inner class
      this.Source = source(eventStreams, this)
    }

    getAllResources () {
      const resources = {}

      const topic = {
        apiVersion: 'messagehub.seed.ibm.com/v1beta1',
        kind: 'Topic',
        metadata: {
          name: this.name
        },
        spec: {
          bindingFrom: {
            name: eventStreams.name
          },
          topicName: this.topicName
        }
      }
      addResource(resources, topic, this.name + '-topic.yaml')

      return resources
    }
  }
}

function source (eventStreams, topic) {
  return class Source extends Bundle {
    constructor ({ name }) {
      super()
      this.name = name
    }

    addSink (sink) {
      this.sink = sink
    }

    getAllResources () {
      const resources = {}

      this.source = {
        apiVersion: 'sources.eventing.knative.dev/v1alpha1',
        kind: 'KafkaSource',
        metadata: {
          name: this.name
        },
        spec: {
          consumerGroup: this.name,
          bootstrapServers: 'kafka02-prod02.messagehub.services.us-south.bluemix.net:9093', // TODO should be dynamically configured
          topics: topic.topicName, // TODO should be dynamically configured
          net: {
            sasl: {
              enable: true,
              user: eventStreams.getConfig().user.valueFrom,
              password: eventStreams.getConfig().password.valueFrom
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
      addResource(resources, this.source, this.name + '.yaml', 'knative')

      return resources
    }
  }
}

class LanguageTranslator extends CloudService {
  constructor ({ name, plan = 'lite' }) {
    super({ name, plan, service: 'language-translator', servicetype: 'IAM' })
  }

  getConfig () {
    const name = 'binding-' + this.name
    return {
      url: { valueFrom: { secretKeyRef: { name, key: 'url' } } },
      apikey: { valueFrom: { secretKeyRef: { name, key: 'apikey' } } }
    }
  }
}

module.exports = { CloudService, StreamingAnalytics, EventStreams, LanguageTranslator }
