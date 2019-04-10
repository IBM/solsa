let k8s = require('@kubernetes/client-node')

let sk8s = {}

sk8s.createSecret = function (namespace, name, secret) {
  const client = k8s.Config.defaultClient()
  const ksecret = new k8s.V1Secret()
  ksecret.metadata = new k8s.V1ObjectMeta()
  ksecret.metadata.name = name
  ksecret.stringData = secret
  return client.createNamespacedSecret(namespace, ksecret)
}

module.exports = sk8s
