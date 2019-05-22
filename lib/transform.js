const { Bundle } = require('./bundle')

function valueWrap (val) {
  if (val.valueFrom) return { valueFrom: val.valueFrom }
  if (val.value) return { value: val.value }
  return { value: val }
}

class SchemaTransformer extends Bundle {
  constructor ({ name, env = {}, code, outputKeys }) {
    super()
    this.name = name
    this.env = env
    this.code = code
    this.outputKeys = outputKeys
  }

  getAllResources () {
    const resources = []

    // Kubernetes Job that will run user code and apply the updates
    const env = []
    for (let key in this.env) {
      env.push(Object.assign({ name: key }, valueWrap(this.env[key])))
    }
    env.push({ name: 'SOLSA_USER_CODE', value: JSON.stringify(this.code.toString()) })
    env.push({ name: 'SOLSA_OUTPUT_SCHEMA', value: JSON.stringify(this.outputKeys) })
    env.push({ name: 'SOLSA_NAMESPACE', value: 'default' }) // FIXME: We should not hardwire the namespace!
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
    resources.push({ obj: job, name: this.name + '-stjob.yaml' })

    // Create stub secrets/config maps to be dynamically patched by Job
    Object.keys(this.outputKeys).forEach(name => {
      const stub = {
        apiVersion: 'v1',
        kind: this.outputKeys[name] === 'secret' ? 'Secret' : 'ConfigMap',
        metadata: {
          name: name,
          labels: { 'solsa.ibm.com/name': this.name }
        }
      }
      resources.push({ obj: stub, name: `${this.name}-stub-${name}.yaml` })
    })

    return resources
  }
}

module.exports = { SchemaTransformer }
