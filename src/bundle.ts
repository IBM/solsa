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

import * as merge from 'deepmerge'
import { dynamic } from './helpers'

/** @internal */
export class Solsa {
  [k: string]: any
  bundle: Bundle

  constructor (bundle: Bundle) {
    this.bundle = bundle
  }

  getResources (...args: any[]) {
    return this.skip ? [] : this.bundle.getResources(...args)
  }

  getImages () {
    return this.skip ? [] : this.bundle.getImages()
  }
}

/**
 * The Root of the SolSA class hierarchy
 */
export class Bundle {
  [k: string]: any
  /** @internal */
  /** Internal state of the bundle */
  _solsa = new Solsa(this)

  constructor () {
    Object.defineProperty(this, '_solsa', { enumerable: false })
  }

  /**
   * Skip yaml synthesis for this bundle
   *
   * This call mutates the receiver and returns it.
   */
  useExisting () {
    this._solsa.skip = true
    return this
  }

  /**
   * Return every resource in this bundle
   */
  getResources (...args: any[]): dynamic[] {
    const resources = []
    for (let value of Object.values(this)) {
      if (value instanceof Bundle) {
        resources.push(...value._solsa.getResources(...args))
      }
    }
    return resources
  }

  /**
   * Return every container image in this bundle
   */
  getImages (): { name: string, build?: string, main?: string }[] {
    const images = []
    for (let value of Object.values(this)) {
      if (value instanceof Bundle) {
        images.push(...value._solsa.getImages())
      }
    }
    return images
  }
}

/**
 * A resource with an arbitrary structure
 */
export class Resource extends Bundle {
  /**
   * Construct a bundle with the specified properties
   */
  constructor (properties: { apiVersion: string, kind: string } & dynamic) {
    super()
    Object.assign(this, properties)
  }

  getResources (): dynamic[] {
    return [{ obj: this }]
  }
}
