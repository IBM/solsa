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

/*
wget https://raw.githubusercontent.com/kubernetes/kubernetes/master/api/openapi-spec/swagger.json
node codegen.js > ../src/synthetic.ts
*/

const definitions = require('./swagger.json').definitions

const ignored = ['x-kubernetes-int-or-string', 'x-kubernetes-embedded-resource', 'x-kubernetes-preserve-unknown-fields'] // JSONSchemaProps
const misc = ['resource', 'intstr', 'runtime'] // regroup as 'misc'
const gvk = 'x-kubernetes-group-version-kind' // kube resource tag

const forwardMap = {} // key -> [group, version, kind]
const reverseMap = {} // [group, version, kind] -> key

// build maps
for (let key of Object.keys(definitions)) {
  let words = key.split('.')
  let group
  if (key.startsWith('io.k8s.api.')) group = words[3]
  if (key.startsWith('io.k8s.apiextensions-apiserver.pkg.apis.apiextensions.')) group = 'apiextensions'
  if (key.startsWith('io.k8s.apimachinery.')) group = 'apimachinery'
  if (key.startsWith('io.k8s.kube-aggregator.pkg.apis.apiregistration.')) group = 'apiregistration'
  let version = words[words.length - 2]
  if (misc.includes(version)) version = 'misc'
  let kind = words[words.length - 1]
  forwardMap[key] = [group, version, kind]
  reverseMap[group] = reverseMap[group] || {}
  reverseMap[group][version] = reverseMap[group][version] || {}
  reverseMap[group][version][kind] = key
}

// return type of property value
function typeOf (value) {
  if (value['$ref']) {
    return forwardMap[value['$ref'].substring(14)].join('.')
  }
  switch (value.type) {
    case 'integer':
    case 'string':
    case 'number':
    case 'boolean':
      return value.type
    case 'array':
      return `${typeOf(value.items)}[]`
    default:
      return `{ [k: string]: ${typeOf(value.additionalProperties)} }`
  }
}

// format a property declaration
function format ([key, value, required]) {
  return `${key}${required ? '' : '?'}: ${typeOf(value)}`
}

// build array of resource properties
function propertiesOf (resource, kind) {
  if (!resource.properties) return [] // object with no properties
  let properties = Object.assign({}, resource.properties)
  let required = resource.required || []
  if (resource[gvk]) { // omit apiVersion, kind, and status field in kube resource
    delete properties.apiVersion
    delete properties.kind
    delete properties.status
    required.push('spec', 'metadata') // always require spec and metadata
  }
  return Object.entries(properties)
    .filter(([key]) => !ignored.includes(key)) // filter ignored property names
    .map(([key, value]) => [key, value, required.includes(key)]) // flag required properties
}

// copyright and license
console.log(`/*
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
`)

// tslint config
console.log(`/* tslint:disable:no-unnecessary-qualifier jsdoc-format */`)
console.log()

// imports
console.log(`import { Core } from './core'`)
console.log()
console.log(`export type integer = number`)
console.log()

// generate namespace, type, and class declarations
for (let [group, g] of Object.entries(reverseMap)) {
  console.log(`export namespace ${group} {`) // outer namespace for the group
  for (let [version, v] of Object.entries(g)) {
    console.log(`  export namespace ${version} {`) // inner namespace for the version
    for (let [kind, key] of Object.entries(v)) {
      let resource = definitions[key]
      // console.log(`    // ${key}`)
      if (resource.description) { // resource description
        console.log(`    /**`)
        resource.description.split('\n').map(line => console.log(`     *${line === '' ? '' : ' ' + line}`))
        console.log(`     */`)
      }
      let properties = propertiesOf(resource, kind)
      if (key === 'io.k8s.apimachinery.pkg.util.intstr.IntOrString') { // special case
        console.log(`    export type IntOrString = number | string`) // export special type declaration
      } else if (resource.type !== 'object') { // type alias
        console.log(`    export type ${kind} = ${resource.type || 'any'}`) // export simple type declaration
      } else {
        if (resource[gvk]) { // kube resource, synthesize class
          let apiVersion = resource[gvk][0].group ? resource[gvk][0].group + '/' + version : version
          console.log(`    export class ${kind} extends Core implements I${kind} {`) // declare class
          for (let [key, value, required] of properties) { // field declarations
            console.log(`      ${format([key, value, required])}`) // field declaration
          }
          if (resource.description) { // repeat resource description on constructor
            console.log(`      /**`)
            resource.description.split('\n').map(line => console.log(`       *${line === '' ? '' : ' ' + line}`))
            console.log(`       */`)
          }
          console.log(`      constructor (properties: I${kind}) {`) // constructor
          console.log(`        super('${apiVersion}', '${kind}')`) // super call
          console.log(`        ${properties.map(([key]) => `this.${key} = properties.${key}`).join('\n        ')}`) // field initializers
          console.log(`      }`)
          console.log(`    }`)
        }
        if (properties.length > 0) { // synthesize type
          console.log(`    export interface ${resource[gvk] ? 'I' : ''}${kind} {`)
          for (let [key, value, required] of properties) { // field declarations
            if (value.description) console.log(`      /** ${value.description.replace(/\*\//g, '*\\')} */`) // field description
            console.log(`      ${format([key, value, required])}`) // field declaration
          }
          console.log(`    }`)
        } else { // object with no properties
          console.log(`    export type ${kind} = any`)
        }
      }
    }
    console.log(`  }`)
  }
  console.log(`}`)
}
