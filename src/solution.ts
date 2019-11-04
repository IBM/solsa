/*
 * Copyright 2019 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { dynamic } from './helpers'
import { runCommand } from './cli'

/**
 * Solution is the root of SolSA's class hierarchy. A solution is either a SolSA
 * resource or a bundle of SolSA resources.
 */
export abstract class Solution {
  /**
   * Omit receiver when synthesizing YAML.
   *
   * This method makes it possible to declare resources requirements for which
   * no YAML is synthesized. It mutates the receiver object and returns it.
   *
   * @return this
   */
  useExisting () {
    this.toResources = function (...args: any[]) { return [] }
    this.toImages = function () { return [] }
    return this
  }

  /**
   * Collect every Kubernetes resource in this solution.
   *
   * @return an array of Kubernetes resources
   */
  abstract toResources (...args: any[]): dynamic[]

  /**
   * Collect every container image descriptor in this solution.
   *
   * @return an array of container image descriptors
   */
  toImages (): { name: string, build?: string, main?: string }[] {
    return []
  }

  /**
   * Run command on this solution.
   */
  runCommand (args: string[]): void {
    runCommand(args, this)
  }
}

/**
 * A Bundle is an extensible collection of SolSA resources.
 *
 * To add SolSA resources to a bundle simply assign these resources to fields of
 * the bundle object.
 *
 * @example
 * let Bundle = new Bundle()
 * bundle.service = new ContainerizedService({ name: 'my-service', image: 'my-image' })
 */

export class Bundle extends Solution {
  [k: string]: any

  /**
   * Create an extensible resource bundle.
   */
  constructor (content?: dynamic) {
    super()
    Object.assign(this, content)
  }

  toResources (...args: any[]): dynamic[] {
    const resources = []
    for (let value of Object.values(this)) {
      if (value.toResources) {
        resources.push(...value.toResources(...args))
      }
    }
    return resources
  }

  toImages (): { name: string, build?: string, main?: string }[] {
    const images = []
    for (let value of Object.values(this)) {
      if (value.toImages) {
        images.push(...value.toImages())
      }
    }
    return images
  }
}

/**
 * A Resource represents a single SolSA resource.
 */
export abstract class Resource extends Solution { }

/**
 * A KubernetesResource represents a single Kubernetes resource.
 */
export class KubernetesResource extends Resource {
  /**
   * Create a resource withe the given properties. The `apiVersion` and `kind`
   * properties are mandatory.
   */
  constructor (properties: { apiVersion: string, kind: string } & dynamic) {
    super()
    Object.assign(this, properties)
  }

  toResources (...args: any[]): dynamic[] {
    return [{ obj: this }]
  }
}
