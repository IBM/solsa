import * as solsa from '..'

export = new solsa.v1.Service({ name: 'hello', type: 'ClusterIP', ports: [{ port: 8080, targetPort: 8080 }], spec: { selector: 'solsa.ibm.com/pod: hello' } })
