/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Bundle } from './bundle'
import { KafkaSource } from './knative'
import { SecretCreator } from './transform'
import { dynamic } from './helpers'

export namespace ibmcloud {
  export class Service extends Bundle {
    name: string
    serviceClass: string
    plan: string
    serviceClassType?: string

    constructor ({ name, serviceClass, plan, serviceClassType }: { name: string, serviceClass: string, plan: string, serviceClassType?: string }) {
      super()
      this.name = name
      this.serviceClass = serviceClass
      this.plan = plan
      this.serviceClassType = serviceClassType
    }

    get Binding () {
      const that = this

      return class extends Binding {
        constructor ({ name = that.name } = {}) {
          super({ name, serviceName: that.name })
        }
      }
    }

    getResources () {
      const obj = {
        apiVersion: 'ibmcloud.ibm.com/v1alpha1',
        kind: 'Service',
        metadata: {
          name: this.name
        },
        spec: {
          serviceClass: this.serviceClass,
          plan: this.plan,
          serviceClassType: this.serviceClassType
        }
      }
      return [{ obj, name: this.name + '-service-ibmcloud.yaml' }]
    }
  }

  export class Binding extends Bundle {
    name: string
    serviceName: string

    constructor ({ name, serviceName }: { name: string, serviceName: string }) {
      super()
      this.name = name
      this.serviceName = serviceName
    }

    getSecret (key: string) {
      return { valueFrom: { secretKeyRef: { name: this.name, key } } }
    }

    getResources () {
      const obj = {
        apiVersion: 'ibmcloud.ibm.com/v1alpha1',
        kind: 'Binding',
        metadata: {
          name: this.name
        },
        spec: {
          serviceName: this.serviceName
        }
      }
      return [{ obj, name: this.name + '-binding-ibmcloud.yaml' }]
    }
  }

  export class Topic extends Bundle {
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
          const secret = that.bindingFrom.getSecret('kafka_brokers_sasl').valueFrom.secretKeyRef
          const bootstrapServers = {
            getValueFrom: {
              kind: 'Secret',
              name: secret.name,
              path: `{.data.${secret.key}}`,
              'format-transformers': ['Base64ToString', 'JsonToObject', 'ArrayToCSString']
            }
          }
          const user = that.bindingFrom.getSecret('user').valueFrom
          const password = that.bindingFrom.getSecret('password').valueFrom
          super({ name, bootstrapServers, consumerGroup, user, password, topics: that.topicName, sink })
        }
      }
    }

    getResources () {
      const obj = {
        apiVersion: 'ibmcloud.ibm.com/v1alpha1',
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
}

export class CloudService extends Bundle {
  service: ibmcloud.Service
  binding: ibmcloud.Binding

  constructor ({ name, serviceClass, plan, serviceClassType }: { name: string, serviceClass: string, plan: string, serviceClassType?: string }) {
    super()
    this.service = new ibmcloud.Service({ name, serviceClass, plan, serviceClassType })
    this.binding = new this.service.Binding()
  }

  getSecret (key: string) {
    return this.binding.getSecret(key)
  }
}

export class EventStreams extends CloudService {
  topics = new Bundle()
  topicCounter = 0

  constructor ({ name, plan = 'standard', serviceClassType }: { name: string, plan?: string, serviceClassType?: string }) {
    super({ name, plan, serviceClass: 'messagehub', serviceClassType })
  }

  get Topic () {
    const bindingFrom = this.binding

    return class extends ibmcloud.Topic {
      constructor ({ name, topicName }: { name: string, topicName?: string }) {
        super({ name, topicName, bindingFrom })
      }
    }
  }

  addTopic (topic: string) {
    this.topics[topic] = new this.Topic({ name: `${this.service.name}-topic-${this.topicCounter++}`, topicName: topic })
  }
}

export class LanguageTranslator extends CloudService {
  constructor ({ name, plan = 'lite' }: { name: string, plan?: string }) {
    super({ name, plan, serviceClass: 'language-translator' })
  }
}
