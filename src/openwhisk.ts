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

export namespace openwhisk {
  export class Action extends Bundle {
    name: string
    code: string
    runtime: string

    constructor ({ name, code, runtime = 'nodejs:default' }: { name: string, code: string, runtime?: string }) {
      super()
      this.name = name
      this.code = code
      this.runtime = runtime
    }

    get Invocation () {
      const that = this

      return class extends Invocation {
        constructor ({ name = that.name, parameters, to }: { name?: string, parameters?: dynamic, to?: dynamic } = {}) {
          super({ name, action: that.name, parameters, to })
        }
      }
    }

    getResources () {
      const obj = {
        apiVersion: 'openwhisk.seed.ibm.com/v1beta1',
        kind: 'Function',
        metadata: {
          name: this.name
        },
        spec: {
          code: this.code,
          runtime: this.runtime
        }
      }
      return [{ obj, name: this.name + '-function-openwhisk.yaml' }]
    }
  }

  export class Invocation extends Bundle {
    name: string
    action: string
    parameters?: dynamic
    to?: dynamic

    constructor ({ name, action = name, parameters, to }: { name: string, action?: string, parameters?: dynamic, to?: dynamic }) {
      super()
      this.name = name
      this.action = action
      this.parameters = parameters
      this.to = to
    }

    getResources () {
      const obj = {
        apiVersion: 'openwhisk.seed.ibm.com/v1beta1',
        kind: 'Invocation',
        metadata: {
          name: this.name
        },
        spec: {
          function: this.action,
          parameters: this.parameters,
          to: this.to
        }
      }
      return [{ obj, name: this.name + '-invocation-openwhisk.yaml' }]
    }
  }
}
