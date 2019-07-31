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

import { Bundle } from './bundle'
import { dynamic } from './helpers'

export class Core extends Bundle {
  constructor (apiVersion: string, kind: string) {
    super()
    this.solsa.apiVersion = apiVersion
    this.solsa.kind = kind
  }

  getResources () {
    const obj: dynamic = {
      apiVersion: this.solsa.apiVersion,
      kind: this.solsa.kind
    }
    Object.assign(obj, this)
    delete obj.solsa
    return [{ obj, name: (this.name || this.metadata.name) + '-' + this.solsa.apiVersion.replace(/[./]/g, '-') + '-' + this.solsa.kind + '.yaml' }]
  }
}
