/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
