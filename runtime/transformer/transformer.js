/* eslint no-eval: 0 */

const k8s = require('@kubernetes/client-node')
const client = k8s.Config.defaultClient()
const minimist = require('minimist')

async function patchSecret (namespace, name, newSecrets) {
  // update newSecrets to base64 encode values
  Object.keys(newSecrets).map(key => { newSecrets[key] = Buffer.from(newSecrets[key]).toString('base64') })
  const savedDefaultHeaders = client.defaultHeaders
  try {
    client.defaultHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/strategic-merge-patch+json' }
    await client.patchNamespacedSecret(name, namespace, { data: newSecrets })
  } catch (err) {
    console.log(err)
  } finally {
    client.defaultHeaders = savedDefaultHeaders
  }
}

async function writeConfigMap (namespace, name, newEntries) {
  const savedDefaultHeaders = client.defaultHeaders
  try {
    client.defaultHeaders = { 'Accept': 'application/json', 'Content-Type': 'application/strategic-merge-patch+json' }
    await client.patchNamespacedConfigMap(name, namespace, { data: newEntries })
  } catch (err) {
    console.log(err)
  } finally {
    client.defaultHeaders = savedDefaultHeaders
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
      console.log(`Patching secret ${name}`)
      patchSecret(argv.namespace, name, data)
    } else if (type === 'configmap') {
      console.log(`Patching cm ${name}`)
      writeConfigMap(argv.namespace, name, data)
    }
  })
}

main()
