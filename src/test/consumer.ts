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
bundle.topic = new bundle.kafka.Topic({ name: 'topic', topicName: 'MyTopic' }).useExisting()

bundle.sink = new solsa.KnativeService({ name: 'sink', image: 'gcr.io/knative-releases/github.com/knative/eventing-sources/cmd/event_display' })
bundle.source = new bundle.topic.Source({ name: 'source', sink: bundle.sink })
