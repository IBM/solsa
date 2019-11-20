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
import { mangledLayerName, base64Encode } from './helpers'
import * as k8s from './core'

/**
 * An Ingress enables external access to selected services in a cluster.
 */
export class Ingress extends Resource {
  /** The name of the ingress. */
  name: string
  /** The default backend service */
  backend?: k8s.extensions.v1beta1.IngressBackend
  /** The rules mapping the paths under a specified host to target backend services. */
  rules?: k8s.extensions.v1beta1.IngressRule[]
  /** Should a secret containing the ingress host infromation be generated (default false) */
  genSecret: boolean

  /**
   * Create an Ingress. The `name` is mandatory.
   * Specify at least one rule or default backend.
   */
  constructor ({ name, rules, backend, genSecret = false }: IIngress) {
    super()
    this.name = name
    this.backend = backend
    this.rules = rules
    this.genSecret = genSecret
  }

  /**
   * Return a `secretKeyRef` reference to the ingress host entry in a Secret generated for this Ingress.
   * NOTE: Generation of this secret is only supported for `iks` ingresses that define a single vhost.
   */
  getIngressHost () {
    this.genSecret = true
    return { secretKeyRef: { name: `${this.name}-ingsec`, key: 'ingressHost' } }
  }

  toResources ({ config = {} }: { config: any }) {
    let resources = []
    let clusterIngresses = config.clusters.filter((x: any) => x.ingress).map(function (x: any) { return { layer: `cluster/${mangledLayerName(x.name)}`, ingress: x.ingress } })
    let contextIngresses = config.contexts.filter((x: any) => x.ingress).map(function (x: any) { return { layer: `context/${mangledLayerName(x.name)}`, ingress: x.ingress } })
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
        if (this.genSecret && vhosts.length > 0) {
          const sec = new k8s.core.v1.Secret({
            metadata: { name: `${this.name}-ingsec` },
            data: { ingressHost: base64Encode(ing.spec.tls![0].hosts![0]) }
          })
          resources.push({ obj: sec, layer })
        }
      } else if (ingress.os) {
        if (this.rules !== undefined) {
          let idx = 0
          const ingressName = this.name
          this.rules.forEach(function (r) {
            if (r.http !== undefined) {
              r.http.paths.forEach(function (p) {
                const routeName = idx === 0 ? r.host! : `${r.host!}-${idx}`
                const route = {
                  apiVersion: 'route.openshift.io/v1',
                  kind: 'Route',
                  metadata: {
                    name: `${routeName}`
                  },
                  spec: {
                    host: '',
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
                  },
                  status: {
                    ingress: []
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
  /** The rules mapping the paths under a specified host to target backend services. */
  rules?: k8s.extensions.v1beta1.IngressRule[]
  /** Should a secret containing the ingress host infromation be generated (default false) */
  genSecret?: boolean
}
