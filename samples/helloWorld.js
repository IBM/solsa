const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.helloWorld = new solsa.ContainerizedService({ name: 'hello-world', image: 'kn-helloworld' })
bundle.ingress = new bundle.helloWorld.Ingress()
