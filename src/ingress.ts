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
import { either } from './helpers'

/**
 * An Ingress manages external access to the services in a cluster.
 */
export class Ingress extends Resource {
  /** @internal */
  _endpoints?: { paths: string[], port: number }[]
  /** @internal */
  _generateSecret?: boolean
  /** The name of the ingress. */
  name: string
  /** If the ingress exposes a single port, its port number. */
  port?: number

  /** The endpoints of the ingress. */
  get endpoints (): { paths: string[], port: number }[] { return either(this._endpoints, this.port === undefined ? [] : [{ paths: ['/'], port: this.port }]) }
  set endpoints (val) { this._endpoints = val }

  /**
   * Create an Ingress. The `name` is mandatory. Specify either a single `port`
   * or an array of `endpoints`.
   */
  constructor ({ name, port, endpoints }: IIngress) {
    super()
    this.name = name
    this.port = port
    this._endpoints = endpoints
  }

  getSecret () {
    this._generateSecret = true
    return { valueFrom: { secretKeyRef: { name: `${this.name}-ingress`, key: 'url' } } }
  }

  getResources ({ config = {} }: { config: any }) {
    let resources = []

    const paths = []
    for (let endpoint of this.endpoints) {
      paths.push(...endpoint.paths.map((path: string) => ({ path, backend: { serviceName: this.name, servicePort: endpoint.port } })))
    }

    let clusterIngresses = config.clusters.filter((x: any) => x.ingress).map(function (x: any) { return { layer: `cluster/${x.name}`, ingress: x.ingress } })
    let contextIngresses = config.contexts.filter((x: any) => x.ingress).map(function (x: any) { return { layer: `context/${x.name}`, ingress: x.ingress } })
    for (let { layer, ingress } of clusterIngresses.concat(contextIngresses)) {
      if (ingress.iks) {
        const vhost = this.name + '.' + ingress.iks.subdomain
        const ing = {
          apiVersion: 'extensions/v1beta1',
          kind: 'Ingress',
          metadata: {
            name: this.name
          },
          spec: {
            tls: [{
              hosts: [vhost],
              secretName: ingress.iks.tlssecret
            }],
            rules: [{
              host: vhost,
              http: {
                paths
              }
            }]
          }
        }
        resources.push({ obj: ing, layer })
        if (this._generateSecret) {
          const secret = {
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
              name: `${this.name}-ingress`
            },
            type: 'Opaque',
            data: {
              url: Buffer.from(vhost).toString('base64')
            }
          }
          resources.push({ obj: secret, layer })
        }
      } else if (ingress.os) {
        const vhost = this.name + '.' + ingress.os.subdomain
        for (let idx in paths) {
          const route = {
            apiVersion: 'route.openshift.io/v1',
            kind: 'Route',
            metadata: {
              name: `${this.name}-${idx}`
            },
            spec: {
              host: vhost,
              port: {
                targetPort: paths[idx].backend.servicePort
              },
              path: paths[idx].path,
              to: {
                kind: 'Service',
                name: paths[idx].backend.serviceName,
                weight: 100
              },
              tls: {
                termination: 'edge'
              },
              wildcardPolicy: 'None'
            }
          }
          resources.push({ obj: route, layer })
        }
        if (this._generateSecret) {
          const secret = {
            apiVersion: 'v1',
            kind: 'Secret',
            metadata: {
              name: `${this.name}-ingress`
            },
            type: 'Opaque',
            data: {
              url: Buffer.from(vhost).toString('base64')
            }
          }
          resources.push({ obj: secret, layer })
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
      } else if (ingress.istio) {
        const gw = {
          apiVersion: 'networking.istio.io/v1alpha3',
          kind: 'Gateway',
          metadata: {
            name: this.name + '-gw'
          },
          spec: {
            selector: {
              istio: 'ingressgateway'
            },
            servers: [{
              port: {
                number: 80,
                name: 'http',
                protocol: 'HTTP'
              },
              hosts: ['*']
            }]
          }
        }
        resources.push({ obj: gw, layer })
        const vs = {
          apiVersion: 'networking.istio.io/v1alpha3',
          kind: 'VirtualService',
          metadata: {
            name: this.name + '-vs'
          },
          spec: {
            hosts: ['*'],
            gateways: [this.name + '-gw']
            /*
            http: this.endpoints.map(({ paths, port }: { paths: any, port: number }) => ({
              match: paths.map((path: any) => ({ uri: { exact: path } })),
              route: [{
                destination: {
                  host: this.name,
                  port: { number: port }
                }
              }]
            }))
            */
          }
        }
        resources.push({ obj: vs, layer })
      }
    }
    return resources
  }
}

export interface IIngress {
  /** The name of the ingress. */
  name: string,
  /** If the ingress exposes a single port, its port number. */
  port?: number,
  /** The endpoints of the ingress. */
  endpoints?: { paths: string[], port: number }[]
}
