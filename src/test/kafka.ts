import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard' })
bundle.topic = new bundle.kafka.Topic({ name: 'topic', topicName: 'MyTopic' })
