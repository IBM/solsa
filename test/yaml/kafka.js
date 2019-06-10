const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard' })
bundle.topic = new bundle.kafka.Topic({ name: 'topic', topicName: 'MyTopic' })
