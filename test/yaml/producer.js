const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.kafka = new solsa.EventStreams({ name: 'kafka', plan: 'standard' }).useExisting()
bundle.topic = new bundle.kafka.Topic({ name: 'topic', topicName: 'MyTopic' }).useExisting()

bundle.producer = new solsa.ContainerizedService({ name: 'producer', image: 'kafka-producer', build: 'kafka-producer' })

bundle.producer.env = {
  BROKERS: bundle.kafka.getSecret('kafka_brokers_sasl'),
  USER: bundle.kafka.getSecret('user'),
  PASSWORD: bundle.kafka.getSecret('password'),
  TOPIC: bundle.topic.topicName
}
