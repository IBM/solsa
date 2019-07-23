import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard' }).useExisting()
bundle.topic = new bundle.kafka.Topic({ name: 'topic', topicName: 'MyTopic' }).useExisting()

bundle.sink = new solsa.KnativeService({ name: 'sink', image: 'gcr.io/knative-releases/github.com/knative/eventing-sources/cmd/event_display' })
bundle.source = new bundle.topic.Source({ name: 'source', sink: bundle.sink })
