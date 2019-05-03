const solsa = require('./solsa')

let cloudservice = {
  CloudService: class CloudService extends solsa.Service {
    constructor (name, spec) {
      super(name)
      this.name = name
      this.spec = spec
    }

    _yaml (archive) {
      let ret = {}
      ret.apiVersion = 'ibmcloud.seed.ibm.com/v1beta1'
      ret.kind = 'Service'
      ret.metadata = { name: this.name }
      ret.spec = this.spec

      let retBinding = {}
      retBinding.apiVersion = 'ibmcloud.seed.ibm.com/v1beta1'
      retBinding.kind = 'Binding'
      retBinding.metadata = { name: 'binding-' + this.name }
      retBinding.spec = { bindingFrom: { name: this.name } }
      if (ret.spec.servicetype === 'IAM') {
        retBinding.spec.servicetype = 'IAM'
      }
      archive.addResource(ret, this.name + '-cloudservice.yaml')
      archive.addResource(retBinding, this.name + '-cloudservice-binding.yaml')
    }
  }
}

cloudservice.MessageHub = class MessageHub extends solsa.Service {
  constructor (name) {
    super(name, true)
    this.addDependency(new cloudservice.CloudService(name, { service: 'messagehub', plan: 'standard' }))
    this.topicCount = 0
  }

  async _yaml (archive) {
    await this._yamlMyDependencies(archive)
  }

  addTopic (name, configs) {
    let topicName = this.name + '-topic-' + this.topicCount
    this.topicCount += 1
    this.addDependency(new cloudservice.Topic(topicName, name, this.name, configs))
  }
}

cloudservice.Topic = class Topic extends solsa.Service {
  constructor (internalName, externalName, messagehubName, configs) {
    super(internalName, true)
    this.internalName = internalName
    this.externalName = externalName
    this.messagehubName = messagehubName
    this.configs = configs
  }

  _yaml (archive) {
    let ret = {}
    ret.apiVersion = 'messagehub.seed.ibm.com/v1beta1'
    ret.kind = 'Topic'
    ret.metadata = { name: this.internalName }
    ret.spec = {
      messageHubName: this.messagehubName,
      bindingFrom: {
        name: 'binding-' + this.messagehubName
      },
      topicName: this.externalName,
      numPartitions: this.configs.numPartitions,
      replicationFactor: this.configs.replicationFactor,
      configs: this.configs.configs
    }
    archive.addResource(ret, this.name + '-topic.yaml')
  }
}

cloudservice.StreamingAnalytics = class StreamingAnalytics extends solsa.Service {
  constructor (name) {
    super(name, true)
    this.addDependency(new cloudservice.CloudService(name, { service: 'streaming-analytics', plan: 'entry-container-hourly', servicetype: 'IAM' }))
  }

  async _yaml (archive) {
    await this._yamlMyDependencies(archive)
  }
}

cloudservice.Redis = class Redis extends solsa.Service {
  constructor (name) {
    super(name, true)
    this.addDependency(new cloudservice.CloudService(name, { service: 'compose-for-redis', plan: 'Standard', parameters: [{ name: 'tls', value: 'false' }] }))
  }

  async _yaml (archive) {
    await this._yamlMyDependencies(archive)
  }
}

cloudservice.getSecretRef = function (key, service) {
  return {
    secretKeyRef: {
      name: 'binding-' + service,
      key: key
    }
  }
}

cloudservice.getValueFromBinding = function (key, service) {
  return {
    name: key,
    valueFrom: cloudservice.getSecretRef(key, service)
  }
}

module.exports = cloudservice
