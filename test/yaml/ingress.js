const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.service = new solsa.ContainerizedService({ name: 'hello-john', image: 'docker.io/ibmcom/kn-helloworld', port: 8080, env: { TARGET: 'John' } })
bundle.ingress = new bundle.service.Ingress()

/*
Try:

curl $(kubectl get ingress hello-john -o jsonpath={.spec.rules[0].host})
*/
