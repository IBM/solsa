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
import { runCommand, minimistOptions } from './cli'
import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
import * as dp from 'dot-prop'
import minimist = require('minimist')

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
  solutions: { [k: string]: Solution }

  /**
   * Create an extensible resource bundle.
   */
  constructor (solutions: { [k: string]: Solution } = {}) {
    super()
    this.solutions = solutions
  }

  toResources (...args: any[]): dynamic[] {
    const resources = []
    for (let value of Object.values(this.solutions)) {
      resources.push(...value.toResources(...args))
    }
    return resources
  }

  toImages (): { name: string, build?: string, main?: string }[] {
    const images = []
    for (let value of Object.values(this.solutions)) {
      images.push(...value.toImages())
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
export abstract class KubernetesResource extends Resource {
  apiVersion: String
  kind: String

  /**
   * Create a resource with the given `apiVersion` and `kind`.
   */
  constructor (properties: { apiVersion: string, kind: string }) {
    super()
    this.apiVersion = properties.apiVersion
    this.kind = properties.kind
  }

  toResources (...args: any[]): dynamic[] {
    return [{ obj: this }]
  }
}

/**
 * A RawKubernetesResource represents an untyped Kubernetes resource.
 */
export class RawKubernetesResource extends KubernetesResource {
  [k: string]: any

  /**
   * Create a resource with the given properties. The `apiVersion` and `kind`
   * properties are mandatory.
   */
  constructor (properties: { apiVersion: string, kind: string } & dynamic) {
    super({ apiVersion: properties.apiVersion, kind: properties.kind })
    Object.assign(this, properties)
  }
}

// Support for loading an optional values.yaml for the top-level solution (approx a values.yaml for a Helm chart)
let _solutionConfig: dynamic = {}
export function loadSolutionConfig (solutionDir: string) {
  const args = process.argv.slice(2)
  const argv = minimist(args, minimistOptions)

  const valuesFile = path.join(solutionDir, 'values.yaml')
  if (fs.existsSync(valuesFile)) {
    try {
      _solutionConfig = yaml.safeLoad(fs.readFileSync(valuesFile).toString())
      if (argv.debug) {
        console.error(`Loaded ${valuesFile}`)
        console.error(yaml.safeDump(_solutionConfig))
      }
    } catch (err) {
      console.error('Error loading yaml from file ${valuesFile}')
      throw err
    }
  }

  // process set options
  if (argv.set) {
    const setArgs: string[] = typeof argv.set === 'string' ? [ argv.set ] : argv.set
    setArgs.forEach(element => {
      element.split(',').forEach(arg => {
        const idx = arg.indexOf('=')
        if (idx !== -1) {
          const path = arg.substr(0, idx)
          const value = arg.substr(idx + 1)
          dp.set(_solutionConfig, path, value)
          if (argv.debug) {
            console.error(`set ${path} to ${value}`)
          }
        }
      })
    })
  }

  // process value options
  if (argv.values) {
    let mixin = require('mout/object/deepMixIn')
    const valArgs: string[] = typeof argv.values === 'string' ? [ argv.values ] : argv.values
    valArgs.forEach(fname => {
      const vf = path.isAbsolute(fname) ? fname : path.join(process.cwd(), fname)
      if (fs.existsSync(vf)) {
        try {
          const delta = yaml.safeLoad(fs.readFileSync(vf).toString())
          if (argv.debug) {
            console.error(`merging values from ${vf}`)
          }
          mixin(_solutionConfig, delta)
        } catch (err) {
          console.error(`Error processing ${vf}`)
          throw err
        }
      }
    })
  }

  if (argv.debug) {
    console.error('Final value of Solution Config')
    console.error(yaml.safeDump(_solutionConfig))
  }

}

/**
 * Access the contents of the optional values.yaml file co-located with
 * the top-level Solution being processed.
 */
export function getSolutionConfig (): dynamic {
  return _solutionConfig
}
