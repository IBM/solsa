import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.service = new solsa.ContainerizedService({ name: 'hello-bundle', image: 'docker.io/ibmcom/kn-helloworld', port: 8080, env: { TARGET: 'Bundle' } })
