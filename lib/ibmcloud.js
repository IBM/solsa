const { Bundle } = require('./bundle')
const { knative } = require('./knative')
const { SecretExtender } = require('./transform')

class Service extends Bundle {
  constructor ({ name, service, plan, serviceType }) {
    super()
    this.name = name
    this.service = service
    this.plan = plan
    this.serviceType = serviceType

    const that = this

    this.Binding = class extends Binding {
      constructor ({ name = that.name } = {}) {
        super({ name, serviceType: that.serviceType, bindingFrom: that })
      }
    }
  }

  getAllResources () {
    const obj = {
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
    if (this.serviceType) {
      obj.spec.servicetype = this.serviceType
    }
    return [{ obj, name: this.name + '-service-ibmcloud.yaml' }]
  }
}

class Binding extends Bundle {
  constructor ({ name, bindingFrom, serviceType }) {
    super()
    this.name = name
    this.bindingFrom = bindingFrom
    this.serviceType = serviceType
  }

  getSecret (key) {
    return { valueFrom: { secretKeyRef: { name: this.name, key } } }
  }

  getAllResources () {
    const obj = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Binding',
      metadata: {
        name: this.name
      },
      spec: {
        bindingFrom: {
          name: this.bindingFrom.name
        }
      }
    }
    if (this.serviceType) {
      obj.spec.servicetype = this.serviceType
    }
    return [{ obj, name: this.name + '-binding-ibmcloud.yaml' }]
  }
}

class CloudService extends Bundle {
  constructor ({ name, service, plan, serviceType }) {
    super()
    this.service = new Service({ name, service, plan, serviceType })
    this.binding = new this.service.Binding()
  }

  getSecret (key) {
    return this.binding.getSecret(key)
  }
}

class StreamingAnalytics extends CloudService {
  constructor ({ name, plan = 'lite' }) {
    super({ name, plan, service: 'streaming-analytics', serviceType: 'IAM' })

    const serviceInstance = this.service.name

    this.StreamsJob = class extends StreamsJob {
      constructor ({ name, codeUri }) {
        super({ name, codeUri, serviceInstance })
      }
    }
  }
}

class StreamsJob extends Bundle {
  constructor ({ name, serviceInstance, codeUri }) {
    super()
    this.name = name
    this.serviceInstance = serviceInstance
    this.codeUri = codeUri
  }

  getAllResources () {
    const obj = {
      apiVersion: 'streams.seed.ibm.com/v1beta1',
      kind: 'Stream',
      metadata: {
        name: this.name
      },
      spec: {
        type: 'ibm-streams',
        language: 'sab',
        serviceInstance: this.serviceInstance,
        codeUri: this.codeUri
      }
    }
    return [{ obj, name: this.name + '-streams-job-ibmcloud.yaml' }]
  }
}

class EventStreams extends CloudService {
  constructor ({ name, plan = 'standard' }) {
    super({ name, plan, service: 'messagehub' })

    const bindingFrom = this.binding

    this.Topic = class extends Topic {
      constructor ({ name, topicName = name }) {
        super({ name, topicName, bindingFrom })
      }
    }
  }
}

class Topic extends Bundle {
  constructor ({ name, bindingFrom, topicName = name }) {
    super()
    this.name = name
    this.bindingFrom = bindingFrom
    this.topicName = topicName

    this.Source = class extends Bundle {
      constructor ({ name, consumerGroup = name, sink }) {
        super()
        const bootstrapServers = { getValueFrom: { secretKeyRef: { name: bindingFrom.getSecret('').valueFrom.secretKeyRef.name, key: 'kafka_brokers_sasl_fixed' } } }
        const user = bindingFrom.getSecret('user').valueFrom
        const password = bindingFrom.getSecret('password').valueFrom

        this.source = new knative.KafkaSource({ name, bootstrapServers, consumerGroup, user, password, topics: topicName, sink })

        this.transformer = new SecretExtender({
          name: name,
          code: function () { const v = JSON.parse(process.env.INPUT); return { 'kafka_brokers_sasl_fixed': v.join() } },
          output: bindingFrom.name,
          env: {
            INPUT: bindingFrom.getSecret('kafka_brokers_sasl')
          }
        })
      }
    }
  }

  getAllResources () {
    const obj = {
      apiVersion: 'messagehub.seed.ibm.com/v1beta1',
      kind: 'Topic',
      metadata: {
        name: this.name
      },
      spec: {
        bindingFrom: {
          name: this.bindingFrom.name
        },
        topicName: this.topicName
      }
    }
    return [{ obj, name: this.name + '-topic-ibmcloud.yaml' }]
  }
}

class LanguageTranslator extends CloudService {
  constructor ({ name, plan = 'lite' }) {
    super({ name, plan, service: 'language-translator', serviceType: 'IAM' })
  }
}

module.exports = { ibmcloud: { Service, Binding, Topic, StreamsJob }, CloudService, StreamingAnalytics, EventStreams, LanguageTranslator }
