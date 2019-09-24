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

import { com_ibm_ibmcloud } from './crds'

declare module './crds' {
  namespace com_ibm_ibmcloud {
    namespace v1alpha1 {
      interface Service {
        getBinding ({ name }?: { name?: string }): Binding
      }
      interface Topic {
        getSource ({ name, consumerGroup, sink }: { name: string, consumerGroup?: string, sink: { name: string } & dynamic }): KafkaSource
      }
    }
  }
}

com_ibm_ibmcloud.v1alpha1.Service.prototype.getBinding = function ({ name }: { name?: string } = {}) {
  return new com_ibm_ibmcloud.v1alpha1.Binding({ metadata: { name: name || this.metadata.name }, spec: { serviceName: this.metadata.name as string } })
}

com_ibm_ibmcloud.v1alpha1.Topic.prototype.getSource = function ({ name, consumerGroup, sink }: { name: string, consumerGroup?: string, sink: { name: string } & dynamic }) {
  if (this.spec.bindingFrom !== undefined) {
    const bootstrapServers = {
      getValueFrom: {
        kind: 'Secret',
        name: this.spec.bindingFrom.name,
        path: `{.data.kafka_brokers_sasl}`,
        'format-transformers': ['Base64ToString', 'JsonToObject', 'ArrayToCSString']
      }
    }
    const user = { secretKeyRef: { name: this.spec.bindingFrom.name, key: 'user' } }
    const password = { secretKeyRef: { name: this.spec.bindingFrom.name, key: 'password' } }
    return new KafkaSource({ name, bootstrapServers, consumerGroup, user, password, topics: this.spec.topicName, sink })
  } else {
    // TODO
    throw new Error('unimplemented')
  }
}

export class CloudService extends Bundle {
  service: com_ibm_ibmcloud.v1alpha1.Service
  binding: com_ibm_ibmcloud.v1alpha1.Binding

  constructor ({ name, serviceClass, plan, serviceClassType }: { name: string, serviceClass: string, plan: string, serviceClassType?: string }) {
    super()
    this.service = new com_ibm_ibmcloud.v1alpha1.Service({ metadata: { name }, spec: { serviceClass, plan, serviceClassType } })
    this.binding = this.service.getBinding()
  }

  getSecret (key: string) {
    return { valueFrom: { secretKeyRef: { name: this.binding.metadata.name, key } } }
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
    this.secret = new EventStreamsSecret(name)
  }

  getSecret (key: string) {
    if (key === 'kafka_brokers_sasl_flat') {
      return { valueFrom: { secretKeyRef: { name: this.binding.metadata.name + '-kbsf', key } } }
    } else {
      return super.getSecret(key)
    }
  }

  getTopic ({ name, topicName }: { name: string, topicName?: string }) {
    return new com_ibm_ibmcloud.v1alpha1.Topic({
      metadata: { name },
      spec: { topicName: topicName || name, bindingFrom: { name: this.binding.metadata.name as string } }
    })
  }

  addTopic (topic: string) {
    this.topics[topic] = new this.Topic({ name: `${this.binding.metadata.name}-topic-${this.topicCounter++}`, topicName: topic })
  }
}

export class LanguageTranslator extends CloudService {
  constructor ({ name, plan = 'lite' }: { name: string, plan?: string }) {
    super({ name, plan, serviceClass: 'language-translator' })
  }
}
