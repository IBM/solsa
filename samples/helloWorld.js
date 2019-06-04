const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.helloWorld = new solsa.ContainerizedService({ name: 'hello-world', image: 'kn-helloworld', port: 8080 })
bundle.ingress = new bundle.helloWorld.Ingress()
