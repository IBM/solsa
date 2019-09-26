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

import { core, apps, extensions, meta } from './core'

declare module './core' {
  namespace apps {
    namespace v1 {
      interface Deployment {
        getService (): core.v1.Service
      }
    }
    namespace v1beta2 {
      interface Deployment {
        getService (): core.v1.Service
      }
    }
  }
  namespace extensions {
    namespace v1beta1 {
      interface Deployment {
        getService (): core.v1.Service
      }
    }
  }
}

namespace coreExt {
  export function servicePorts (containers: core.v1.Container[]): core.v1.ServicePort[] {
    let ports: core.v1.ServicePort[] = []
    containers.forEach(function (c: core.v1.Container) {
      if (c.ports !== undefined) {
        c.ports.forEach(function (cp: core.v1.ContainerPort) {
          ports.push({ name: cp.name, port: cp.containerPort, targetPort: cp.containerPort, protocol: cp.protocol })
        })
      }
    })
    return ports
  }

  export function augmentLabels (meta: meta.v1.ObjectMeta, toAdd: { [k: string]: string }) {
    if (meta.labels === undefined) {
      meta.labels = {}
    }
    Object.assign(meta.labels, toAdd)
  }
}

apps.v1.Deployment.prototype.getService = function () {
  if (this.spec.template.spec === undefined) {
    throw new Error('Cannot get a service on Deployment without a spec')
  }
  if (this.metadata.name === undefined) {
    throw new Error('Deployment must have a `name` to derive a service')
  }
  if (this.spec.selector.matchLabels === undefined) {
    throw new Error('Deployment must define spec.selector.matchLabels to use getService')
  }

  // Ensure all labels in selector are included in the PodSpec metadata
  const selector = this.spec.selector.matchLabels
  if (this.spec.template.metadata === undefined) {
    this.spec.template.metadata = { }
  }
  coreExt.augmentLabels(this.spec.template.metadata, selector)

  const ports = coreExt.servicePorts(this.spec.template.spec.containers)
  return new core.v1.Service({ metadata: { name: this.metadata.name }, spec: { ports, selector, type: 'ClusterIP' } })
}

extensions.v1beta1.Deployment.prototype.getService = function () {
  if (this.spec.template.spec === undefined) {
    throw new Error('Cannot get a service on Deployment without a spec')
  }
  if (this.metadata.name === undefined) {
    throw new Error('Deployment must have a `name` to derive a service')
  }
  if (this.spec.selector === undefined) {
    this.spec.selector = { matchLabels: { 'solsa.ibm.com/pod' : this.metadata.name } }
  }

  // Ensure all labels in selector are included in the PodSpec metadata
  const selector = this.spec.selector.matchLabels
  if (this.spec.template.metadata === undefined) {
    this.spec.template.metadata = { }
  }
  coreExt.augmentLabels(this.spec.template.metadata, selector!)

  const ports = coreExt.servicePorts(this.spec.template.spec.containers)
  return new core.v1.Service({ metadata: { name: this.metadata.name }, spec: { ports, selector, type: 'ClusterIP' } })
}

apps.v1beta2.Deployment.prototype.getService = extensions.v1beta1.Deployment.prototype.getService
