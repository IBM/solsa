/* eslint no-eval: 0 */

const k8s = require('@kubernetes/client-node')
const client = k8s.Config.defaultClient()

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

async function patchConfigMap (namespace, name, newEntries) {
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
  const code = process.env.SOLSA_USER_CODE
  const namespace = process.env.SOLSA_NAMESPACE
  const outputSecret = process.env.SOLSA_OUTPUT_SECRET
  const outputConfigMap = process.env.SOLSA_OUTPUT_CONFIG_MAP

  // Run the user-supplied transform function
  const thunk = `(${code})()`
  const res = eval(thunk)

  // Use the result to patch the targeted output resource
  if (outputSecret) {
    console.log(`Patching secret ${outputSecret}`)
    patchSecret(namespace, outputSecret, res)
  } else if (outputConfigMap) {
    console.log(`Patching configMap ${outputConfigMap}`)
    patchConfigMap(namespace, outputConfigMap, res)
  }
}

main()
