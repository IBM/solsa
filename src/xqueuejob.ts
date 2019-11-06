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

import { KubernetesResource } from './solution'
import { core, meta } from './core'
import { dictionary } from './helpers'

export namespace io_k8s_incubator_arbitrator {
  export namespace v1alpha1 {
    export class XQueueJob extends KubernetesResource implements IXQueueJob {
      metadata: meta.v1.ObjectMeta
      spec: XQueueJobSpec

      constructor (properties: IXQueueJob) {
        super({ apiVersion: 'arbitrator.incubator.k8s.io/v1alpha1', kind: 'XQueueJob' })
        this.metadata = properties.metadata
        this.spec = properties.spec
      }

      setNamespace (namespace: string) {
        this.spec.resources.Items.forEach(item => {
          const template: any = item.template
          if (template.kind !== 'PersistentVolume') template.metadata.namespace = namespace
        })
        this.spec.resources.Items.unshift({
          replicas: 1,
          type: 'Namespace',
          template: new core.v1.Namespace({ metadata: { name: namespace, labels: { job_id: namespace } } })
        })
        return this
      }

      setLabels (labels: dictionary) {
        this.spec.resources.Items.forEach(item => {
          const template: any = item.template
          if (template.kind === 'Deployment') {
            template.spec.template.metadata.labels = Object.assign({}, labels, { job_id: template.metadata.namespace }, template.spec.template.metadata.labels)
          } else {
            template.metadata.labels = Object.assign({}, labels, { name: template.metadata.name, job_id: template.metadata.namespace }, template.metadata.labels)
          }
        })
        return this
      }

    }

    export function pack (...resources: KubernetesResource[]) {
      return { Items: resources.map(template => ({ replicas: 1, type: (template as any).kind, template })) }
    }

    export interface IXQueueJob {
      /** Standard object metadata. */
      metadata: meta.v1.ObjectMeta
      spec: XQueueJobSpec
    }

    export interface XQueueJobSpec {
      schedulingSpec?: { minAvailable?: number }
      resources: { Items: { replicas: number, type: string, template: KubernetesResource }[] }
    }
  }
}
