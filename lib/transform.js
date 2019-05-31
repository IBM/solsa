const { Bundle } = require('./bundle')
const { enumerate } = require('../helpers')

class SchemaTransformer extends Bundle {
  constructor ({ name, env = {}, code, outputSecret, outputConfigMap, useExistingOutput = true }) {
    super()
    this.name = name
    this.env = env
    this.code = code
    this.outputSecret = outputSecret
    this.outputConfigMap = outputConfigMap
    this.useExistingOutput = useExistingOutput
  }

  getAllResources () {
    let resources = []

    const env = Object.assign({}, this.env)
    env.SOLSA_USER_CODE = this.code.toString()
    env.SOLSA_NAMESPACE = { valueFrom: { fieldRef: { fieldPath: 'metadata.namespace' } } }
    if (this.outputSecret) env.SOLSA_OUTPUT_SECRET = this.outputSecret
    if (this.outputConfigMap) env.SOLSA_OUTPUT_CONFIG_MAP = this.outputConfigMap

    // Kubernetes Job that will run user code and apply the updates
    const job = {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: this.name
      },
      spec: {
        template: {
          metadata: {
            name: this.name
          },
          spec: {
            restartPolicy: 'Never',
            serviceAccount: 'solsa-transformer',
            containers: [{
              name: this.name,
              image: 'registry.ng.bluemix.net/seed/solsa-transformer',
              env: enumerate(env)
            }]
          }
        }
      }
    }
    resources.push({ obj: job, name: this.name + '-stjob.yaml' })

    // Optionally create stub secret or config map that will be dynamically patched by Job
    if (!this.useExistingOutput && (this.outputSecret || this.outputConfigMap)) {
      const stub = {
        apiVersion: 'v1',
        kind: this.outputSecret ? 'Secret' : 'ConfigMap',
        metadata: {
          name: this.outputSecret || this.outputConfigMap
        }
      }
      resources.push({ obj: stub, name: this.name + '-stub.yaml' })
    }

    return resources
  }
}

class SecretExtender extends SchemaTransformer {
  /**
   * Define a Job that when executed will add new key/value pairs to an existing Secret.
   * The function provided by the `code` parameter should return a JavaScript object that
   * is a dictionary[String,String].  The String value of each field of the object will
   * be base64 encoded and stored in the `output` Secret using the name of the field
   * as the key.  If a key already exists in the Secret, its previous value will be replaced.
   * @param name The name of this resource
   * @param env The environment in which the Job will be executed
   * @param code The user function to execute
   * @param output The name of the Secret being extended with new values.
   */
  constructor ({ name, env = {}, code, output }) {
    super({ name, env, code, outputSecret: output, useExistingOutput: true })
  }
}

class ConfigMapExtender extends SchemaTransformer {
  /**
   * Define a Job that when executed will add new key/value pairs to an existing ConfigMap.
   * The function provided by the `code` parameter should return a JavaScript object that
   * is a dictionary[String,String].  The String value of each field of the object will
   * be stored in the `output` ConfigMap using the name of the field as the key.
   * If a key already exists in the ConfigMap, its previous value will be replaced.
   * @param name The name of this resource
   * @param env The environment in which the Job will be executed
   * @param code The user function to execute
   * @param output The name of the ConfigMap being extended with new values.
   */
  constructor ({ name, env = {}, code, output }) {
    super({ name, env, code, outputConfigMap: output, useExistingOutput: true })
  }
}

module.exports = { SchemaTransformer, SecretExtender, ConfigMapExtender }
