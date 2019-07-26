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
import { dynamic, enumerate } from './helpers'

export class SchemaTransformer extends Bundle {
  name: string
  code: any
  env: dynamic
  outputSecret?: string
  outputConfigMap?: string
  useExistingOutput?: boolean

  constructor ({ name, env = {}, code, outputSecret, outputConfigMap, useExistingOutput }: { name: string, code: any, env?: dynamic, outputSecret?: string, outputConfigMap?: string, useExistingOutput?: boolean }) {
    super()
    this.name = name
    this.env = env
    this.code = code
    this.outputSecret = outputSecret
    this.outputConfigMap = outputConfigMap
    this.useExistingOutput = useExistingOutput
  }

  getResources () {
    let resources = []

    const env = Object.assign({}, this.env)
    env.SOLSA_USER_CODE = this.code.toString()
    env.SOLSA_NAMESPACE = { valueFrom: { fieldRef: { fieldPath: 'metadata.namespace' } } }
    if (this.outputSecret) env.SOLSA_OUTPUT_SECRET = this.outputSecret
    if (this.outputConfigMap) env.SOLSA_OUTPUT_CONFIG_MAP = this.outputConfigMap

    // Kubernetes Job that will run user code and apply the updates
    const job = {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: this.name
      },
      spec: {
        template: {
          metadata: {
            name: this.name
          },
          spec: {
            restartPolicy: 'Never',
            serviceAccount: 'solsa-transformer',
            containers: [{
              name: this.name,
              image: 'registry.ng.bluemix.net/seed/solsa-transformer',
              env: enumerate(env)
            }]
          }
        }
      }
    }
    resources.push({ obj: job, name: this.name + '-stjob.yaml' })

    // Optionally create stub secret or config map that will be dynamically patched by Job
    if (!this.useExistingOutput && (this.outputSecret || this.outputConfigMap)) {
      const stub = {
        apiVersion: 'v1',
        kind: this.outputSecret ? 'Secret' : 'ConfigMap',
        metadata: {
          name: this.outputSecret || this.outputConfigMap
        }
      }
      resources.push({ obj: stub, name: this.name + '-stub.yaml' })
    }

    return resources
  }
}

export class SecretCreator extends SchemaTransformer {
  /**
   * Define a Job that when executed will create a new Secret.
   * The function provided by the `code` parameter should return a JavaScript object that
   * is a dictionary[String,String].  The String value of each field of the object will
   * be base64 encoded and stored in the `output` Secret using the name of the field
   * as the key.
   * @param name The name of this resource
   * @param env The environment in which the Job will be executed
   * @param code The user function to execute
   * @param output The name of the Secret to be created.
   */
  constructor ({ name, env, code, output }: { name: string, env?: dynamic, code: any, output: string }) {
    super({ name, env, code, outputSecret: output, useExistingOutput: false })
  }
}

export class ConfigMapCreator extends SchemaTransformer {
  /**
   * Define a Job that when executed will create a new ConfigMap.
   * The function provided by the `code` parameter should return a JavaScript object that
   * is a dictionary[String,String].  The String value of each field of the object will
   * be stored in the `output` ConfigMap using the name of the field as the key.
   * @param name The name of this resource
   * @param env The environment in which the Job will be executed
   * @param code The user function to execute
   * @param output The name of the ConfigMap to be created.
   */
  constructor ({ name, env, code, output }: { name: string, env?: dynamic, code: any, output: string }) {
    super({ name, env, code, outputConfigMap: output, useExistingOutput: false })
  }
}
