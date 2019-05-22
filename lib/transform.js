const { Bundle } = require('./bundle')

function valueWrap (val) {
  if (val.valueFrom) return { valueFrom: val.valueFrom }
  if (val.value) return { value: val.value }
  return { value: val }
}

class SchemaTransformer extends Bundle {
  constructor ({ name, env = {}, code, outputSecret, outputConfigMap }) {
    super()
    this.name = name
    this.env = env
    this.code = code
    this.outputSecret = outputSecret
    this.outputConfigMap = outputConfigMap
  }

  getAllResources () {
    // Kubernetes Job that will run user code and apply the updates
    const env = []
    for (let key in this.env) {
      env.push(Object.assign({ name: key }, valueWrap(this.env[key])))
    }
    env.push({ name: 'SOLSA_USER_CODE', value: JSON.stringify(this.code.toString()) })
    env.push({ name: 'SOLSA_NAMESPACE', value: 'default' }) // FIXME: We should not hardwire the namespace!
    if (this.outputSecret) {
      env.push({ name: 'SOLSA_OUTPUT_SECRET', value: this.outputSecret })
    } else if (this.outputConfigMap) {
      env.push({ name: 'SOLSA_OUTPUT_CONFIG_MAP', value: this.outputConfigMap })
    }

    const job = {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: this.name,
        labels: { 'solsa.ibm.com/name': this.name }
      },
      spec: {
        template: {
          metadata: {
            name: this.name,
            labels: { 'solsa.ibm.com/name': this.name }
          },
          spec: {
            restartPolicy: 'Never',
            serviceAccount: 'solsa-transformer',
            containers: [{
              name: this.name,
              image: 'us.icr.io/seed/solsa-transformer',
              env: env
            }]
          }
        }
      }
    }

    // Create stub secret or config map that will be dynamically patched by Job
    const stub = {
      apiVersion: 'v1',
      kind: this.outputSecret ? 'Secret' : 'ConfigMap',
      metadata: {
        name: this.outputSecret || this.outputConfigMap || this.name,
        labels: { 'solsa.ibm.com/name': this.name }
      }
    }

    return [{ obj: job, name: this.name + '-stjob.yaml' }, { obj: stub, name: this.name + '-stub.yaml' }]
  }
}

module.exports = { SchemaTransformer }
