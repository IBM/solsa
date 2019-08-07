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

import * as fs from 'fs'

interface Definition {
  // [k: string]: any
  description?: string,
  type?: string,
  properties?: { [k: string]: any },
  required?: string[],
  'x-kubernetes-group-version-kind'?: { group: string, version: string, kind: string }[]
}

const definitions: { [k: string]: Definition } = JSON.parse(fs.readFileSync(0).toString()).definitions

const ignored = ['x-kubernetes-int-or-string', 'x-kubernetes-embedded-resource', 'x-kubernetes-preserve-unknown-fields'] // JSONSchemaProps
const misc = ['api', 'pkg', 'util'] // regroup as 'misc'

const tree: { [k: string]: { [k: string]: { [k: string]: string } } } = {} // [group, version, kind] -> key

// split key into [group, version, kind]
function split (key: string) {
  let [group, version, kind] = `pkg.${key}`.split('.').slice(-3) // runtime -> pkg.runtime hack for ibm cloud functions operator
  if (group === process.argv[3]) group = process.argv[4] // hack to rename group
  if (misc.includes(group)) group = 'misc'
  return [group, version, kind]
}

// build definition tree
for (let key of Object.keys(definitions)) {
  let [group, version, kind] = split(key)
  tree[group] = tree[group] || {}
  tree[group][version] = tree[group][version] || {}
  tree[group][version][kind] = key
}

// return type of property value
function typeOf (value: any): string {
  if (value['$ref']) {
    return split(value['$ref'].substring(14)).join('.')
  }
  switch (value.type) {
    case 'integer':
      return 'number'
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
function format ([key, value, required]: [string, any, boolean]) {
  return `${key}${required ? '' : '?'}: ${typeOf(value)}`
}

// build array of resource properties
function propertiesOf (resource: Definition): [string, any, boolean][] {
  if (!resource.properties) return []
  let properties = Object.assign({}, resource.properties)
  let required = resource.required || []
  if (resource['x-kubernetes-group-version-kind']) { // omit apiVersion, kind, and status field in kube resource
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
 * Copyright 2019 IBM Corporation${process.argv[2]}
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

// warning
console.log(`/* GENERATED FILE; DO NOT EDIT */`)
console.log()

// tslint config
console.log(`/* tslint:disable:no-unnecessary-qualifier jsdoc-format */`)
console.log()

// imports
console.log(`import { Resource } from './bundle'`)
if (!tree.core) console.log(`import { core, meta, misc } from './core'`)
console.log()

// generate namespace, type, and class declarations
for (let [group, g] of Object.entries(tree)) {
  console.log(`export namespace ${group} {`) // outer namespace for the group
  for (let [version, v] of Object.entries(g)) {
    console.log(`  export namespace ${version} {`) // inner namespace for the version
    for (let [kind, key] of Object.entries(v)) {
      let resource = definitions[key]
      // console.log(`    // ${key}`)
      if (resource.description) { // resource description
        console.log(`    /**`)
        resource.description.split('\n').map(line => console.log(`     *${line ? ' ' + line : ''}`))
        console.log(`     */`)
      }
      let properties = propertiesOf(resource)
      if (key === 'io.k8s.apimachinery.pkg.util.intstr.IntOrString') { // special case
        console.log(`    export type IntOrString = number | string`) // export special type declaration
      } else if (resource.type !== 'object' && properties.length === 0) { // type alias
        console.log(`    export type ${kind} = ${resource.type || 'any'}`) // export simple type declaration
      } else {
        if (resource['x-kubernetes-group-version-kind']) { // kube resource, synthesize class
          let apiVersion = resource['x-kubernetes-group-version-kind'][0].group ? resource['x-kubernetes-group-version-kind'][0].group + '/' + version : version
          console.log(`    export class ${kind} extends Resource implements I${kind} {`) // declare class
          for (let [key, value, required] of properties) { // field declarations
            console.log(`      ${format([key, value, required])}`) // field declaration
          }
          if (resource.description) { // repeat resource description on constructor
            console.log(`      /**`)
            resource.description.split('\n').map(line => console.log(`       *${line ? ' ' + line : ''}`))
            console.log(`       */`)
          }
          console.log(`      constructor (properties: I${kind}) {`) // constructor
          console.log(`        super({ apiVersion: '${apiVersion}', kind: '${kind}' })`) // super call
          console.log(`        ${properties.map(([key]) => `this.${key} = properties.${key}`).join('\n        ')}`) // field initializers
          console.log(`      }`)
          console.log(`    }`)
        }
        if (properties.length > 0) { // synthesize type
          console.log(`    export interface ${resource['x-kubernetes-group-version-kind'] ? 'I' : ''}${kind} {`)
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
