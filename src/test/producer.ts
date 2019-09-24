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

import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard' }).useExisting()
bundle.topic = bundle.kafka.getTopic({ name: 'topic', topicName: 'MyTopic' }).useExisting()

bundle.producer = new solsa.ContainerizedService({ name: 'producer', image: 'kafka-producer', build: 'kafka-producer' })

bundle.producer.env = {
  BROKERS: bundle.kafka.getSecret('kafka_brokers_sasl'),
  USER: bundle.kafka.getSecret('user'),
  PASSWORD: bundle.kafka.getSecret('password'),
  TOPIC: bundle.topic.spec.topicName
}
