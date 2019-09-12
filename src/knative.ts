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
import { dynamic, enumerate } from './helpers'

/**
 * A Knative Service
 */
export class KnativeService extends Resource implements IKnativeService {
  name: string
  image: string
  env: dynamic
  build?: string
  main?: string
  ingress: boolean

  /**
   * Create a KnativeService. The properties `name` and `image` are mandatory.
   */
  constructor ({ name, image, env = {}, build, main, ingress }: IKnativeService) {
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
        template: {
          spec: {
            containers: [{
              image: this.image,
              env: enumerate(this.env)
            }]
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

export interface IKnativeService {
  /** The name of the service */
  name: string
  /** The container image that implements the service */
  image: string
  /** The environment variable bindings to be defined for the executing container  */
  env?: dynamic
  /** The path to the NodeJS package that implements the service */
  build?: string
  /** The name of the entry point to be executed */
  main?: string
  /** Should external access to the service be provided by defining an Ingress for it? */
  ingress?: boolean
}

export class KnativeChannel extends Resource implements IKnativeChannel {
  name: String

  /** Create a KNative Channel.  The property `name` is mandatory. */
  constructor ({ name }: IKnativeChannel) {
    super()
    this.name = name
  }

  getResources () {
    const obj = {
      apiVersion: 'eventing.knative.dev/v1alpha1',
      kind: 'Channel',
      metadata: {
        name: this.name
      }
    }
    return [{ obj }]
  }
}
export interface IKnativeChannel {
  /** The name of the Channel */
  name: String
}

export class KnativeSubscription extends Resource implements IKnativeSubscription {
  name: String
  channel: IKnativeChannel
  subscriber?: IKnativeService
  reply?: IKnativeChannel

  /**
   * Create a KnativeSubscription. The properties `name` and `channel` and mandatory.
   * At least one of `subscriber` or `reply` must also be provided.
   */
  constructor ({ name, channel, subscriber, reply }: IKnativeSubscription) {
    super()
    this.name = name
    this.channel = channel
    this.subscriber = subscriber
    this.reply = reply
  }

  getResources () {
    const obj: dynamic = {
      apiVersion: 'eventing.knative.dev/v1alpha1',
      kind: 'Subscription',
      metadata: {
        name: this.name
      },
      spec: {
        channel: {
          apiVersion: 'eventing.knative.dev/v1alpha1',
          kind: 'Channel',
          name: this.channel.name
        }
      }
    }
    if (this.subscriber) {
      obj.spec.subscriber = {
        ref: {
          apiVersion: 'serving.knative.dev/v1alpha1',
          kind: 'Service',
          name: this.subscriber.name
        }
      }
    }
    if (this.reply) {
      obj.spec.reply = {
        channel: {
          apiVersion: 'eventing.knative.dev/v1alpha1',
          kind: 'Channel',
          name: this.reply.name
        }
      }
    }
    return [{ obj }]
  }
}
export interface IKnativeSubscription {
  /** The name of the Subscription */
  name: String
  /** The subscribed Channel */
  channel: IKnativeChannel
  /** An optional Service to process events on the subscribed Channel */
  subscriber?: IKnativeService
  /** An optional output Channel */
  reply?: IKnativeChannel
}

export class KafkaSource extends Resource implements IKafkaSource {
  name: string
  consumerGroup: string
  bootstrapServers: dynamic
  topics: string
  user: dynamic
  password: dynamic
  sink: { name: string } & dynamic

  /** Create a KafkaSource. The properties `name`, `bootstrapServers`, `user`, `password` and `sink` and mandatory */
  constructor ({ name, consumerGroup = name, bootstrapServers, topics = name, user, password, sink }: IKafkaSource) {
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
export interface IKafkaSource {
  /** The name of the Kafka Source */
  name: string
  /** The consumer group (optional) */
  consumerGroup?: string
  /** The bootstrap servers to connect to */
  bootstrapServers: dynamic
  /** The topics to conntect to */
  topics?: string
  /** Authentication: username */
  user: dynamic
  /** Authentication: password */
  password: dynamic
  /** Event sink */
  sink: { name: string } & dynamic
}
