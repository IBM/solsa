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

import { Resource } from './solution'
import * as k8s from './core'

/**
 * An Ingress enables external access to selected services in a cluster.
 */
export class Ingress extends Resource {
  /** The name of the ingress. */
  name: string
  /** The default backend service */
  backend?: k8s.extensions.v1beta1.IngressBackend
  /** The  */
  rules?: k8s.extensions.v1beta1.IngressRule[]

  /**
   * Create an Ingress. The `name` is mandatory.
   * Specify at least one rule or default backend.
   */
  constructor ({ name, rules, backend }: IIngress) {
    super()
    this.name = name
    this.backend = backend
    this.rules = rules
  }

  toResources ({ config = {} }: { config: any }) {
    let resources = []
    let clusterIngresses = config.clusters.filter((x: any) => x.ingress).map(function (x: any) { return { layer: `cluster/${x.name}`, ingress: x.ingress } })
    let contextIngresses = config.contexts.filter((x: any) => x.ingress).map(function (x: any) { return { layer: `context/${x.name}`, ingress: x.ingress } })
    let vhosts: string[] = []
    if (this.rules !== undefined) {
      let vhs: Set<string> = new Set()
      this.rules.forEach((r) => { if (r.host !== undefined) { vhs.add(r.host) } })
      vhs.forEach((v) => vhosts.push(v))
    }
    for (let { layer, ingress } of clusterIngresses.concat(contextIngresses)) {
      if (ingress.iks) {
        const ing = new k8s.extensions.v1beta1.Ingress({
          metadata: { name: this.name },
          spec: {
            tls: [{
              hosts: vhosts.map(h => h + '.' + ingress.iks.subdomain),
              secretName: ingress.iks.tlssecret
            }]
          }
        })
        if (this.rules !== undefined) {
          ing.spec.rules = this.rules.map(function (r) { return { host: r.host + '.' + ingress.iks.subdomain, http: r.http } })
        }
        if (this.backend !== undefined) {
          ing.spec.backend = this.backend
        }
        resources.push({ obj: ing, layer })
      } else if (ingress.os) {
        if (this.rules !== undefined) {
          let idx = 0
          const ingressName = this.name
          this.rules.forEach(function (r) {
            if (r.http !== undefined) {
              const vhost = r.host! + '.' + ingress.os.subdomain
              r.http.paths.forEach(function (p) {
                const route = {
                  apiVersion: 'route.openshift.io/v1',
                  kind: 'Route',
                  metadata: {
                    name: `${ingressName}-${idx}`
                  },
                  spec: {
                    host: vhost,
                    port: {
                      targetPort: p.backend.servicePort
                    },
                    path: p.path,
                    to: {
                      kind: 'Service',
                      name: p.backend.serviceName,
                      weight: 100
                    },
                    tls: {
                      termination: 'edge'
                    },
                    wildcardPolicy: 'None'
                  }
                }
                resources.push({ obj: route, layer })
                idx = idx + 1
              })
            }
          })
        }
      } else if (ingress.nodePort) {
        const nodePortPatch = [{ op: 'replace', path: '/spec/type', value: 'NodePort' }]
        if (Array.isArray(ingress.nodePort)) {
          const match = ingress.nodePort.filter((obj: any) => obj.name === this.name)
          if (match.length === 1) {
            nodePortPatch.push({ op: 'add', path: '/spec/ports/0/nodePort', value: match[0].port })
          }
        }
        const nodePortPatchTarget = {
          target: {
            version: 'v1',
            kind: 'Service',
            name: this.name
          }
        }
        resources.push({ JSONPatch: nodePortPatch, JSONPatchTarget: nodePortPatchTarget, layer })
      }
    }
    return resources
  }
}

export interface IIngress {
  /** The name of the ingress. */
  name: string
  /** The default backend service */
  backend?: k8s.extensions.v1beta1.IngressBackend
  /** The  */
  rules?: k8s.extensions.v1beta1.IngressRule[]
}
