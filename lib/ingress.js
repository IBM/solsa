const { Bundle } = require('./bundle')
const { either } = require('../helpers')

class Ingress extends Bundle {
  constructor ({ name, port, endpoints } = {}) {
    super()
    this.name = name
    this.port = port
    this.endpoints = endpoints
  }

  get endpoints () { return either(this._endpoints, [{ paths: ['/'], port: this.port }]) }
  set endpoints (val) { this._endpoints = val }

  getResources ({ config = {} } = {}) {
    let resources = []

    const paths = []
    for (let endpoint of this.endpoints) {
      paths.push(...endpoint.paths.map(path => ({ path, backend: { serviceName: this.name, servicePort: endpoint.port } })))
    }

    let clusterIngresses = config.clusters.filter(x => x.ingress).map(function (x) { return { layer: `cluster/${x.name}`, ingress: x.ingress } })
    let contextIngresses = config.contexts.filter(x => x.ingress).map(function (x) { return { layer: `context/${x.name}`, ingress: x.ingress } })
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
        resources.push({ obj: ing, name: `ingress-${this.name}.yaml`, layer })
      } else if (ingress.os) {
        const vhost = this.name + '.' + ingress.os.subdomain
        for (let idx in paths) {
          const route = {
            apiVersion: 'route.openshift.io/v1',
            kind: 'Route',
            metadata: {
              name: this.name
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
          resources.push({ obj: route, name: `route-${this.name}-${idx}.yaml`, layer })
        }
      } else if (ingress.nodePort) {
        const nodePortPatch = [{ op: 'replace', path: '/spec/type', value: 'NodePort' }]
        if (Array.isArray(ingress.nodePort)) {
          const match = ingress.nodePort.filter(obj => obj.name === this.name)
          if (match.length === 1) {
            nodePortPatch.push({ op: 'add', path: '/spec/ports/0/nodePort', value: match[0].port })
          }
        }
        const nodePortPatchTarget = {
          target: {
            version: 'v1',
            kind: 'Service',
            name: this.name
          },
          path: `expose-svc-${this.name}.yaml`
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
        resources.push({ obj: gw, name: `gw-${this.name}.yaml`, layer })
        const vs = {
          apiVersion: 'networking.istio.io/v1alpha3',
          kind: 'VirtualService',
          metadata: {
            name: this.name + '-vs'
          },
          spec: {
            hosts: ['*'],
            gateways: [this.name + '-gw'],
            http: this.endpoints.map(({ paths, port }) => ({
              match: paths.map(path => ({ uri: { exact: path } })),
              route: [{
                destination: {
                  host: this.name,
                  port: { number: port }
                }
              }]
            }))
          }
        }
        resources.push({ obj: vs, name: `vs-${this.name}.yaml`, layer })
      }
    }
    return resources
  }
}

module.exports = { Ingress }
