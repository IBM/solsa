/*
wget https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json
node codegen.js > ../src/synthetic.ts
*/

const swagger = require('./swagger.json')

class Schema {
  constructor (that) {
    Object.assign(this, that)
  }

  toString () {
    let text = `{ apiVersion: '${this.apiVersion}', kind: '${this.kind}'`
    if (this.metadata) text += `, metadata: true`
    if (this.spec) text += `, spec: true`
    text += ` }`
    return text
  }
}

const all = {}

for (let resource of Object.values(swagger.definitions)) {
  if (resource.type === 'object' && resource['x-kubernetes-group-version-kind']) {
    const schema = {}
    const group = resource['x-kubernetes-group-version-kind'][0].group
    const version = resource['x-kubernetes-group-version-kind'][0].version
    schema.apiVersion = group ? group + '/' + version : version
    schema.kind = resource['x-kubernetes-group-version-kind'][0].kind
    if (resource.properties.metadata) schema.metadata = true
    if (resource.properties.spec) schema.spec = true

    let level = all
    for (let part of schema.apiVersion.split(/[./]/)) level = level[part] = level[part] || {}
    level[schema.kind] = new Schema(schema)
  }
}

console.log(`import { Core } from './core'`)
console.log(`import { dynamic } from './helpers'`)
console.log()

function dump (indent, schema) {
  console.log(indent + `export class ${schema.kind} extends Core {`)
  console.log(indent + `  constructor (args: dynamic) {`)
  console.log(indent + `    super(${schema}, args)`)
  console.log(indent + `  }`)
  console.log(indent + `}`)
}

function nest (indent, group) {
  for (let key of Object.keys(group)) {
    if (group[key] instanceof Schema) {
      dump(indent, group[key])
    } else {
      console.log(indent + `export namespace ${key} {`)
      nest(indent + '  ', group[key])
      console.log(indent + `}`)
    }
  }
}

for (let key of Object.keys(all)) {
  console.log(`export namespace ${key} {`)
  nest('  ', all[key])
  console.log(`}`)
}
