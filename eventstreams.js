const solsa = require('./solsa')

class EvenStreams extends solsa.Service {
  constructor (name) {
    super(name, true)

    this.kafkaBrokersSasl = this.addSecret(`binding-${name}`, 'kafka_brokers_sasl')
    this.password = this.addSecret(`binding-${name}`, 'password')
    this.user = this.addSecret(`binding-${name}`, 'user')
  }

  _yaml (archive) {
    const svc = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Service',
      metadata: {
        name: this.name
      },
      spec: {
        service: 'messagehub',
        plan: 'standard'
      }
    }
    archive.addResource(svc, this.name + '-svc.yaml')
    const binding = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Binding',
      metadata: {
        name: `binding-${this.name}`
      },
      spec: {
        bindingFrom: {
          name: this.name
        }
      }
    }
    archive.addResource(binding, this.name + '-binding.yaml')
  }
}

module.exports = EvenStreams
