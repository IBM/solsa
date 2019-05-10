const { Bundle } = require('./bundle')

class CloudService extends Bundle {
  constructor ({ name, service, plan, servicetype }) {
    super()
    this.name = name
    this.service = service
    this.plan = plan
    this.servicetype = servicetype
  }

  getSecret (key) {
    return { valueFrom: { secretKeyRef: { name: 'binding-' + this.name, key } } }
  }

  getAllResources () {
    const svc = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Service',
      metadata: {
        name: this.name
      },
      spec: {
        service: this.service,
        plan: this.plan
      }
    }
    const binding = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Binding',
      metadata: {
        name: `binding-${this.name}`
      },
      spec: {
        bindingFrom: {
          name: this.name
        }
      }
    }
    if (this.servicetype) {
      svc.spec.servicetype = this.servicetype
      binding.spec.servicetype = this.servicetype
    }
    return [{ obj: svc, name: this.name + '-svc.yaml' }, { obj: binding, name: this.name + '-binding.yaml' }]
  }
}

class StreamingAnalytics extends CloudService {
  constructor ({ name, plan = 'lite' }) {
    super({ name, plan, service: 'streaming-analytics', servicetype: 'IAM' })

    this.Job = job(this) // inner class
  }
}

function job (streamingAnalytics) {
  return class Job extends Bundle {
    constructor ({ name, uri }) {
      super()
      this.name = name
      this.uri = uri
    }

    getAllResources () {
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
      return [{ obj: job, name: this.name + '-streamsjob.yaml' }]
    }
  }
}

class EventStreams extends CloudService {
  constructor ({ name, plan = 'standard' }) {
    super({ name, plan, service: 'messagehub' })

    this.Topic = topic(this) // inner class
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

    getSecret (key) {
      if (key === 'topicName') return { value: this.topicName } // TODO should be dynamic
      return super.getSecret(key)
    }

    getAllResources () {
      const topic = {
        apiVersion: 'messagehub.seed.ibm.com/v1beta1',
        kind: 'Topic',
        metadata: {
          name: this.name
        },
        spec: {
          bindingFrom: {
            name: 'binding-' + eventStreams.name
          },
          topicName: this.topicName
        }
      }
      return [{ obj: topic, name: this.name + '-topic.yaml' }]
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
              user: eventStreams.getSecret('user').valueFrom,
              password: eventStreams.getSecret('password').valueFrom
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
      return [{ obj: this.source, name: this.name + '.yaml', layer: 'knative' }]
    }
  }
}

class LanguageTranslator extends CloudService {
  constructor ({ name, plan = 'lite' }) {
    super({ name, plan, service: 'language-translator', servicetype: 'IAM' })
  }
}

module.exports = { CloudService, StreamingAnalytics, EventStreams, LanguageTranslator }
