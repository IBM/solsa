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

    const that = this

    this.StreamsJob = class extends StreamsJob {
      constructor ({ name, codeUri }) {
        super({ name, codeUri, serviceInstance: that.name })
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
    const job = {
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
    return [{ obj: job, name: this.name + '-streamsjob.yaml' }]
  }
}

class EventStreams extends CloudService {
  constructor ({ name, plan = 'standard' }) {
    super({ name, plan, service: 'messagehub' })

    const that = this

    this.Topic = class extends Topic {
      constructor ({ name, topicName }) {
        super({ name, topicName, serviceInstance: that.name })
      }
    }
  }
}

class Topic extends Bundle {
  constructor ({ name, serviceInstance, topicName }) {
    super()
    this.name = name
    this.serviceInstance = serviceInstance
    this.topicName = topicName
  }

  getSecret (key) {
    if (key === 'topicName') return { value: this.topicName } // TODO should be dynamic
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
          name: 'binding-' + this.serviceInstance
        },
        topicName: this.topicName
      }
    }
    return [{ obj: topic, name: this.name + '-topic.yaml' }]
  }
}

class LanguageTranslator extends CloudService {
  constructor ({ name, plan = 'lite' }) {
    super({ name, plan, service: 'language-translator', servicetype: 'IAM' })
  }
}

module.exports = { CloudService, StreamingAnalytics, StreamsJob, EventStreams, Topic, LanguageTranslator }
