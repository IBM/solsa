let yaml = require('js-yaml')
let needle = require('needle')

let streams = {
  StreamsJob: class StreamsJob {
    constructor (name, sab) {
      this.name = name
      this.sab = sab
    }

    listOperators () {
      return needle('post', `https://${this.name}-svc/list`, { json: true })
        .then(result => result.body)
    }

    _helm (archive, target, templateDir) {
      const j = {
        apiVersion: 'streams.ibm.com/v1alpha1',
        kind: 'Job',
        metadata: {
          name: this.name
        },
        spec: {
          requestedPes: 1,
          peImagePullPolicy: 'IfNotPresent',
          runtimeTraceLevel: 'DEBUG',
          sabName: this.sab,
          restartFailedPods: true
        }
      }
      archive.append(yaml.safeDump(j, { noArrayIndent: true }),
        { name: templateDir + this.name + '-job' })

      const svc = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: this.name + '-svc'
        },
        spec: {
          ports: [{
            port: 8080
          }],
          selector: {
            app: 'streams',
            svc: 'pe'
          }
        }
      }
      archive.append(yaml.safeDump(svc, { noArrayIndent: true }),
        { name: templateDir + this.name + '-svc' })
    }
  }
}

module.exports = streams
