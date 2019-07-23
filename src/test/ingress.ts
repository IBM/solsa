import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.service = new solsa.ContainerizedService({ name: 'hello-john', image: 'docker.io/ibmcom/kn-helloworld', port: 8080, env: { TARGET: 'John' } })
bundle.ingress = new bundle.service.Ingress()

/*
Try:

curl $(kubectl get ingress hello-john -o jsonpath={.spec.rules[0].host})
*/
