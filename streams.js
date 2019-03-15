let needle = require('needle')

// FIXME: Streams.knative limitation -- must be in same namespace as the Streams.knative controller pod
//        So we hardwire that in the yaml and also hardwire a cross-NS service reference in all needle
//        calls from the wrapper service to the service in the streams NS that wraps the StreamsJob
const StreamsKNativeNS = 'streams'
const SVC_PORT = 8080

let streams = {
  StreamsJob: class StreamsJob {
    constructor (name, sab) {
      this.name = name
      this.sab = sab
    }

    async listOperators (name) {
      const url = `http://${name}-svc` + '.' + StreamsKNativeNS + ':' + SVC_PORT + '/list'
      console.log('listOperators: ' + url)
      return needle('get', url, { json: true })
        .then(result => result.body)
    }

    // FIXME: We should generate all of the invoke routes at runtime by asking the
    //        Streams service we are connected to what operators it has and then
    //        generate the matching routes.
    //     OR We should generate all of the invoke routes at build time by taking
    //        a yaml file that describes the exposed routes from the argument SAB
    //        and generating a StreamsJob with exactly those routes.
    async invoke (name, operator, payload) {
      const url = `http://${name}-svc` + '.' + StreamsKNativeNS + ':' + SVC_PORT + '/operator/' + operator
      console.log('invoke: ' + url + ' ' + JSON.stringify(payload))
      return needle('put', url, payload, { json: true })
        .then(result => result.body)
    }

    _yaml (archive, target, yamlDir) {
      const j = {
        apiVersion: 'streams.ibm.com/v1alpha1',
        kind: 'Job',
        metadata: {
          name: this.name,
          namespace: StreamsKNativeNS
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
          namespace: StreamsKNativeNS
        },
        spec: {
          ports: [{ port: SVC_PORT }],
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
