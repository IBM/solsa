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
import { dynamic, enumerate } from './helpers'
import { Ingress } from './ingress'

export class KnativeService extends Bundle {
  name: string
  image: string
  env: dynamic
  build?: string
  main?: string
  ingress: boolean

  constructor ({ name, image, env = {}, build, main, ingress }: { name: string, image: string, env?: dynamic, build?: string, main?: string, ingress?: boolean }) {
    super()
    this.name = name
    this.image = image
    this.env = env
    this.build = build
    this.main = main
    this.ingress = !!ingress
  }

  get Ingress () {
    const that = this

    return class extends Bundle {
      constructor () {
        super()
        that.ingress = true
      }
    }
  }

  getResources () {
    const obj = {
      apiVersion: 'serving.knative.dev/v1alpha1',
      kind: 'Service',
      metadata: {
        name: this.name,
        labels: this.ingress ? undefined : { 'serving.knative.dev/visibility': 'cluster-local' }
      },
      spec: {
        runLatest: {
          configuration: {
            revisionTemplate: {
              spec: {
                container: {
                  image: this.image,
                  env: enumerate(this.env)
                }
              }
            }
          }
        }
      }
    }
    return [{ obj }]
  }

  getImages () {
    return [{ name: this.image, build: this.build, main: this.main }]
  }
}

export class KafkaSource extends Bundle {
  name: string
  consumerGroup: string
  bootstrapServers: dynamic
  topics: string
  user: dynamic
  password: dynamic
  sink: { name: string } & dynamic

  constructor ({ name, consumerGroup = name, bootstrapServers, topics = name, user, password, sink }: { name: string, consumerGroup?: string, bootstrapServers: dynamic, topics?: string, user: dynamic, password: dynamic, sink: { name: string } & dynamic }) {
    super()
    this.name = name
    this.consumerGroup = consumerGroup
    this.bootstrapServers = bootstrapServers
    this.topics = topics
    this.user = user
    this.password = password
    this.sink = sink
  }

  getResources () {
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
    return [{ obj }]
  }
}
