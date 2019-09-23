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

import { Bundle, Resource } from './solution'
import { KafkaSource } from './knative'
import { dynamic } from './helpers'

export namespace ibmcloud {
  export namespace v1alpha1 {
    export class Service extends Resource {
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

      getBinding ({ name = this.name } = {}) {
        return new Binding({ name, serviceName: this.name })
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
        return [{ obj }]
      }
    }

    export class Binding extends Resource {
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
        return [{ obj }]
      }
    }

    export class Topic extends Resource {
      name: string
      bindingFrom: Binding
      topicName: string

      constructor ({ name, bindingFrom, topicName = name }: { name: string, bindingFrom: Binding, topicName?: string }) {
        super()
        this.name = name
        this.bindingFrom = bindingFrom
        this.topicName = topicName
      }

      getSource ({ name, consumerGroup, sink }: { name: string, consumerGroup?: string, sink: { name: string } & dynamic }) {
        const secret = this.bindingFrom.getSecret('kafka_brokers_sasl').valueFrom.secretKeyRef
        const bootstrapServers = {
          getValueFrom: {
            kind: 'Secret',
            name: secret.name,
            path: `{.data.${secret.key}}`,
            'format-transformers': ['Base64ToString', 'JsonToObject', 'ArrayToCSString']
          }
        }
        const user = this.bindingFrom.getSecret('user').valueFrom
        const password = this.bindingFrom.getSecret('password').valueFrom
        return new KafkaSource({ name, bootstrapServers, consumerGroup, user, password, topics: this.topicName, sink })
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
        return [{ obj }]
      }
    }
  }
}

export class CloudService extends Bundle {
  service: ibmcloud.v1alpha1.Service
  binding: ibmcloud.v1alpha1.Binding

  constructor ({ name, serviceClass, plan, serviceClassType }: { name: string, serviceClass: string, plan: string, serviceClassType?: string }) {
    super()
    this.service = new ibmcloud.v1alpha1.Service({ name, serviceClass, plan, serviceClassType })
    this.binding = this.service.getBinding()
  }

  getSecret (key: string) {
    return this.binding.getSecret(key)
  }
}

class EventStreamsSecret extends Resource {
  name: String

  constructor (name: string) {
    super()
    this.name = name
  }

  getResources () {
    const obj = {
      apiVersion: 'ibmcloud.ibm.com/v1alpha1',
      kind: 'Composable',
      metadata: {
        name: `${this.name}-kbsf`
      },
      spec: {
        template: {
          apiVersion: 'v1',
          kind: 'Secret',
          metadata: {
            name: `${this.name}-kbsf`
          },
          data: {
            kafka_brokers_sasl_flat: {
              getValueFrom: {
                kind: 'Secret',
                name: this.name,
                path: `{.data.kafka_brokers_sasl}`,
                'format-transformers': ['Base64ToString', 'JsonToObject', 'ArrayToCSString', 'StringToBase64']
              }
            }
          }
        }
      }
    }
    return [{ obj }]
  }
}

export class EventStreams extends CloudService {
  topics = new Bundle()
  topicCounter = 0
  secret: EventStreamsSecret

  constructor ({ name, plan = 'standard', serviceClassType }: { name: string, plan?: string, serviceClassType?: string }) {
    super({ name, plan, serviceClass: 'messagehub', serviceClassType })
    this.secret = new EventStreamsSecret(this.binding.name)
  }

  getSecret (key: string) {
    if (key === 'kafka_brokers_sasl_flat') {
      return { valueFrom: { secretKeyRef: { name: this.binding.name + '-kbsf', key } } }
    } else {
      return super.getSecret(key)
    }
  }

  getTopic ({ name, topicName }: { name: string, topicName?: string }) {
    return new ibmcloud.v1alpha1.Topic({ name, topicName, bindingFrom: this.binding })
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
