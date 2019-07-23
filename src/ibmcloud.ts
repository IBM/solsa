import { Bundle } from './bundle'
import { KafkaSource } from './knative'
import { SecretExtender } from './transform'
import { dynamic, either } from './helpers'

class Service extends Bundle {
  name: string
  service: string
  plan: string
  serviceType?: string

  constructor ({ name, service, plan, serviceType }: { name: string, service: string, plan: string, serviceType?: string }) {
    super()
    this.name = name
    this.service = service
    this.plan = plan
    this.serviceType = serviceType
  }

  get Binding () {
    const that = this

    return class extends Binding {
      get serviceType () { return either(this.solsa._serviceType, that.serviceType) }
      set serviceType (val) { this.solsa._serviceType = val }

      constructor ({ name = that.name } = {}) {
        super({ name, bindingFrom: that })
      }
    }
  }

  getResources () {
    const obj = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Service',
      metadata: {
        name: this.name
      },
      spec: {
        service: this.service,
        plan: this.plan,
        servicetype: this.serviceType
      }
    }
    return [{ obj, name: this.name + '-service-ibmcloud.yaml' }]
  }
}

class Binding extends Bundle {
  name: string
  bindingFrom: { name: string } & dynamic
  serviceType?: string

  constructor ({ name, bindingFrom, serviceType }: { name: string, bindingFrom: { name: string } & dynamic, serviceType?: string }) {
    super()
    this.name = name
    this.bindingFrom = bindingFrom
    this.serviceType = serviceType
  }

  getSecret (key: string) {
    return { valueFrom: { secretKeyRef: { name: this.name, key } } }
  }

  getResources () {
    const obj = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Binding',
      metadata: {
        name: this.name
      },
      spec: {
        bindingFrom: {
          name: this.bindingFrom.name
        },
        servicetype: this.serviceType
      }
    }
    return [{ obj, name: this.name + '-binding-ibmcloud.yaml' }]
  }
}

export class CloudService extends Bundle {
  service: Service
  binding: Binding

  constructor ({ name, service, plan, serviceType }: { name: string, service: string, plan: string, serviceType?: string }) {
    super()
    this.service = new Service({ name, service, plan, serviceType })
    this.binding = new this.service.Binding()
  }

  getSecret (key: string) {
    return this.binding.getSecret(key)
  }
}

export class StreamingAnalytics extends CloudService {
  constructor ({ name, plan = 'lite' }: { name: string, plan?: string }) {
    super({ name, plan, service: 'streaming-analytics', serviceType: 'IAM' })
  }

  get StreamsJob () {
    const serviceInstance = this.service.name

    return class extends StreamsJob {
      constructor ({ name, codeUri }: { name: string, codeUri: string }) {
        super({ name, codeUri, serviceInstance })
      }
    }
  }
}

class StreamsJob extends Bundle {
  name: string
  serviceInstance: string
  codeUri: string

  constructor ({ name, serviceInstance, codeUri }: { name: string, serviceInstance: string, codeUri: string }) {
    super()
    this.name = name
    this.serviceInstance = serviceInstance
    this.codeUri = codeUri
  }

  getResources () {
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

export class EventStreams extends CloudService {
  topics = new Bundle()
  topicCounter = 0
  saslBrokerFlattener: SecretExtender

  constructor ({ name, plan = 'standard' }: { name: string, plan?: string }) {
    super({ name, plan, service: 'messagehub' })

    this.saslBrokerFlattener = new SecretExtender({
      name: name + '-kbs-flattener',
      code: () => ({ kafka_brokers_sasl_flat: JSON.parse(process.env.INPUT || '').join() }),
      output: this.binding.name,
      env: {
        INPUT: this.binding.getSecret('kafka_brokers_sasl')
      }
    })
  }

  get Topic () {
    const bindingFrom = this.binding

    return class extends Topic {
      constructor ({ name, topicName }: { name: string, topicName?: string }) {
        super({ name, topicName, bindingFrom })
      }
    }
  }

  addTopic (topic: string) {
    this.topics[topic] = new this.Topic({ name: `${this.service.name}-topic-${this.topicCounter++}`, topicName: topic })
  }
}

class Topic extends Bundle {
  name: string
  bindingFrom: Binding
  topicName: string

  constructor ({ name, bindingFrom, topicName = name }: { name: string, bindingFrom: Binding, topicName?: string }) {
    super()
    this.name = name
    this.bindingFrom = bindingFrom
    this.topicName = topicName
  }

  get Source () {
    const that = this

    return class extends KafkaSource {
      constructor ({ name, consumerGroup, sink }: { name: string, consumerGroup?: string, sink: { name: string } & dynamic }) {
        const bootstrapServers = { getValueFrom: { secretKeyRef: { name: that.bindingFrom.getSecret('').valueFrom.secretKeyRef.name, key: 'kafka_brokers_sasl_flat' } } }
        const user = { getValueFrom: { secretKeyRef: { name: that.bindingFrom.getSecret('').valueFrom.secretKeyRef.name, key: 'user' } } }
        const password = { getValueFrom: { secretKeyRef: { name: that.bindingFrom.getSecret('').valueFrom.secretKeyRef.name, key: 'password' } } }
        super({ name, bootstrapServers, consumerGroup, user, password, topics: that.topicName, sink })
      }
    }
  }

  getResources () {
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

export class LanguageTranslator extends CloudService {
  constructor ({ name, plan = 'lite' }: { name: string, plan?: string }) {
    super({ name, plan, service: 'language-translator', serviceType: 'IAM' })
  }
}

export const ibmcloud = { Service, Binding, Topic, StreamsJob }
