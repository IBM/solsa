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

    _yaml (archive, target, yamlDir) {
      const j = {
        apiVersion: 'streams.ibm.com/v1alpha1',
        kind: 'Job',
        metadata: {
          name: this.name,
          namespace: 'streams' // FIXME: Streams.knative limitation -- must be in same namespace as the streams controller pod
        },
        spec: {
          requestedPes: 1,
          processingElement: {
            imagePullPolicy: 'IfNotPresent',
            runtimeTraceLevel: 'DEBUG',
            sabName: this.sab,
            restartFailedPod: true
          }
        }
      }
      archive.addYaml(j, this.name + '-job.yaml')

      const svc = {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: this.name + '-svc',
          namespace: 'streams' // FIXME: Streams.knative limitation -- must be in same namespace as the streams controller pod
        },
        spec: {
          ports: [{ port: 8080 }],
          selector: {
            app: 'streams',
            svc: 'pe'
          }
        }
      }
      archive.addYaml(svc, this.name + '-svc.yaml')
    }
  }
}

module.exports = streams
