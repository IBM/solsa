/*
wget https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json
node codegen.js > ../lib/core.js
standard --fix ../lib/core.js
*/

const swagger = require('./swagger.json')

function synthetize (schema) {
  const { Bundle } = require('./bundle')

  let group = module.exports
  for (let part of schema.apiVersion.split(/[./]/)) group = group[part] = group[part] || {}

  group[schema.kind] = class extends Bundle {
    constructor () {
      super()
      Object.assign(this, arguments[0])
    }

    getAllResources () {
      const obj = {
        apiVersion: schema.apiVersion,
        kind: schema.kind
      }
      const that = Object.assign({}, this)
      delete that.solsa
      if (schema.metadata) {
        obj.metadata = { name: this.name, labels: this.labels, annotations: this.annotations }
        delete that.name
        delete that.labels
        delete that.annotations
      }
      if (schema.spec) {
        const spec = Object.assign({}, that.spec)
        delete that.spec
        obj.spec = Object.assign(spec, that)
      } else {
        Object.assign(obj, that)
      }
      return [{ obj, name: this.name + '-' + schema.apiVersion.replace(/[./]/g, '-') + '-' + schema.kind + '.yaml' }]
    }
  }
}

console.log(synthetize.toString())
console.log()

for (let resource of Object.values(swagger.definitions)) {
  if (resource.type === 'object' && resource['x-kubernetes-group-version-kind']) {
    const schema = {}
    const group = resource['x-kubernetes-group-version-kind'][0].group
    const version = resource['x-kubernetes-group-version-kind'][0].version
    schema.apiVersion = group ? group + '/' + version : version
    schema.kind = resource['x-kubernetes-group-version-kind'][0].kind
    if (resource.properties.metadata) schema.metadata = 1
    if (resource.properties.spec) schema.spec = 1

    console.error('Generating', schema.apiVersion, schema.kind)
    console.log(`synthetize(${JSON.stringify(schema)})`)
  }
}
