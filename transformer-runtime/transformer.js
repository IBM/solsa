/* eslint no-eval: 0 */

const k8s = require('@kubernetes/client-node')
const client = k8s.Config.defaultClient()
const minimist = require('minimist')

async function writeSecret (namespace, name, secretDictionary) {
  const ksecret = new k8s.V1Secret()
  ksecret.metadata = new k8s.V1ObjectMeta()
  ksecret.metadata.name = name
  ksecret.stringData = secretDictionary
  try {
    await client.createNamespacedSecret(namespace, ksecret)
  } catch (err) {
    console.log(err)
  }
}

async function writeConfigMap (namespace, name, dictionary) {
  const kcm = new k8s.V1ConfigMap()
  kcm.metadata = new k8s.V1ObjectMeta()
  kcm.metadata.name = name
  kcm.data = dictionary
  try {
    await client.createNamespacedConfigMap(namespace, kcm)
  } catch (err) {
    console.log(err)
  }
}

function main () {
  const argv = minimist(process.argv.slice(2), {
    default: {
      code: process.env.SOLSA_USER_CODE,
      output: process.env.SOLSA_OUTPUT_SCHEMA,
      namespace: process.env.SOLSA_NAMESPACE || 'default'
    },
    alias: { code: 'c', output: 'o', namespace: 'n' },
    string: ['code', 'output', 'namespace']
  })

  // Run the user-supplied transform function
  const userFunction = JSON.parse(argv.code)
  const thunk = `(${userFunction})()`
  const res = eval(thunk)

  // Parse the user-supplied output directives
  const outputDict = JSON.parse(argv.output)

  // Apply the directives to the value returned from the evaluation of the user code
  Object.keys(outputDict).forEach(name => {
    const type = outputDict[name]
    const data = res[name] || {}
    if (type === 'secret') {
      console.log(`Writing secret ${name}`)
      writeSecret(argv.namespace, name, data)
    } else if (type === 'configmap') {
      console.log(`Writing cm ${name}`)
      writeConfigMap(argv.namespace, name, data)
    }
  })
}

main()
