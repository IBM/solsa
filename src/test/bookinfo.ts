// This is the Istio Bookinfo sample application (https://istio.io/docs/examples/bookinfo/)

import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.details = new solsa.ContainerizedService({ name: 'details', image: 'istio/examples-bookinfo-details-v1:1.11.0', port: 9080 })
bundle.ratings = new solsa.ContainerizedService({ name: 'ratings', image: 'istio/examples-bookinfo-ratings-v1:1.11.0', port: 9080 })
bundle.reviews = new solsa.ContainerizedService({ name: 'reviews', image: 'istio/examples-bookinfo-reviews-v1:1.11.0', port: 9080 })
bundle.productpage = new solsa.ContainerizedService({ name: 'productpage', image: 'istio/examples-bookinfo-productpage-v1:1.11.0', port: 9080 })
bundle.ingress = new bundle.productpage.Ingress()

/*
To obtain the url of bookinfo run:

kubectl get ingress productpage
*/
