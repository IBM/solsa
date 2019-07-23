import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.service = new solsa.KnativeService({ name: 'hello-knative', image: 'docker.io/ibmcom/kn-helloworld', env: { TARGET: 'Knative' } })
bundle.ingress = new bundle.service.Ingress()

/*
Try:

curl $(kubectl get ksvc/hello-knative -o jsonpath={.status.domain})
*/
