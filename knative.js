let solsa = require('./solsa')
const utils = require('./utils.js')

let knative = {
  CronJobSource: class CronJobSource extends solsa.Service {
    constructor (name, schedule, data) {
      super(name, true)
      this.schedule = schedule
      this.data = data
    }

    _yaml (archive, target) {
      const svc = {
        apiVersion: 'sources.eventing.knative.dev/v1alpha1',
        kind: 'CronJobSource',
        metadata: {
          name: this.name
        },
        spec: {
          schedule: this.schedule,
          data: this.data,
          sink: {
            apiVersion: target === utils.targets.KNATIVE ? 'serving.knative.dev/v1alpha1' : 'v1',
            kind: 'Service',
            name: this.solsa.parent.name
          }
        }
      }
      archive.addYaml(svc, this.name + '-source.yaml')
    }
  }
}

module.exports = knative
