const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.service = new solsa.ContainerizedService({ name: 'hello-bundle', image: 'docker.io/ibmcom/kn-helloworld', port: 8080, env: { TARGET: 'Bundle' } })
