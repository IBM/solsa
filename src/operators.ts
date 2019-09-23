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

import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { dynamic } from './helpers'

const files = readFileSync(0).toString().split('\n').filter(file => file)

const yamls = files.map(file => safeLoad(readFileSync(file).toString()))

const currentCSVs = yamls.filter(yaml => yaml.channels && yaml.channels[0].currentCSV).map(yaml => yaml.channels[0].currentCSV)

const csvs = yamls.filter(yaml => yaml.kind === 'ClusterServiceVersion' && yaml.metadata && currentCSVs.includes(yaml.metadata.name))

let docs: any[] = []
csvs.filter(csv => csv.spec.customresourcedefinitions && csv.spec.customresourcedefinitions.owned).forEach(csv => docs.push(...csv.spec.customresourcedefinitions.owned))

const crds = yamls.filter(yaml => yaml.kind === 'CustomResourceDefinition')

let definitions: dynamic = {}

for (let crd of crds) {
  const group = crd.spec.group
  const kind = crd.spec.names.kind
  const version = crd.spec.version

  const key = group.split('.').reverse().join('_').replace(/-/g, '_')
  const name = `${key}.${version}.${kind}`

  const { specDescriptors, description }: { specDescriptors: dynamic[], description: string } = docs.find(def => def.kind === kind && def.name === crd.metadata.name && def.version === version) || {}

  let properties: any = null
  if (crd.spec.validation && crd.spec.validation.openAPIV3Schema && crd.spec.validation.openAPIV3Schema.properties) {
    properties = crd.spec.validation.openAPIV3Schema.properties

    properties.metadata = {
      '$ref': '#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta',
      description: 'Standard object metadata.'
    }

    if (properties.spec) {
      properties.spec.description = `${kind} spec.`

      if (specDescriptors) {
        for (let key in properties.spec.properties) {
          let descriptor = specDescriptors.find(descriptor => descriptor.path === key)
          if (descriptor) properties.spec.properties[key].description = descriptor.description
        }
      }

      definitions[`${name}Spec`] = properties.spec

      properties.spec = {
        '$ref': `#/definitions/${name}Spec`,
        description: properties.spec.description
      }
    }
  }
  definitions[name] = {
    description,
    properties,
    'x-kubernetes-group-version-kind': [
      { group, kind, version }
    ],
    type: 'object'
  }
}

console.log(JSON.stringify({ definitions }, null, 2))
