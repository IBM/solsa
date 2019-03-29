let solsa = require('./solsa')

let knative = {
  CronJobSource: class CronJobSource extends solsa.Service {
    constructor (name, schedule, data) {
      super(name, true)
      this.schedule = schedule
      this.data = data
    }

    _yaml (archive, target) {
      const svcKubernetes = {
        apiVersion: 'sources.eventing.knative.dev/v1alpha1',
        kind: 'CronJobSource',
        metadata: {
          name: this.name
        },
        spec: {
          schedule: this.schedule,
          data: this.data,
          sink: {
            apiVersion: 'v1',
            kind: 'Service',
            name: this.sink.name
          }
        }
      }
      const svcKnative = JSON.parse(JSON.stringify(svcKubernetes))
      svcKnative.spec.sink.apiVersion = 'serving.knative.dev/v1alpha1'

      archive.addResource(svcKubernetes, this.name + '-source.yaml', 'kubernetes')
      archive.addResource(svcKnative, this.name + '-source.yaml', 'knative')
    }
  },

  connect (source, sink) {
    source.sink = sink
  }
}

module.exports = knative
