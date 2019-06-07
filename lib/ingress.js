const { Bundle } = require('./bundle')

class Ingress extends Bundle {
  constructor ({ name, port, endpoints = [{ paths: ['/'], port }] }) {
    super()
    this.name = name
    this.endpoints = endpoints
  }

  getResources ({ config = {} } = {}) {
    let resources = []

    const paths = []
    for (let endpoint of this.endpoints) {
      paths.push(...endpoint.paths.map(path => ({ path, backend: { serviceName: this.name, servicePort: endpoint.port } })))
    }

    // FIXME: hardwiring ingress to be in cluster layer for now
    let specs = (config.clusters || []).filter(x => x.ingress)
    for (const spec of specs) {
      const layer = `cluster/${spec.name}`
      if (spec.ingress.iks) {
        const vhost = this.name + '.' + spec.ingress.iks.subdomain
        const ingress = {
          apiVersion: 'extensions/v1beta1',
          kind: 'Ingress',
          metadata: {
            name: this.name
          },
          spec: {
            tls: [{
              hosts: [vhost],
              secretName: spec.ingress.iks.tlssecret
            }],
            rules: [{
              host: vhost,
              http: {
                paths
              }
            }]
          }
        }
        resources.push({ obj: ingress, name: `ingress-${this.name}.yaml`, layer })
      } else if (spec.ingress.os) {
        const vhost = this.name + '.' + spec.ingress.os.subdomain
        const route = {
          apiVersion: 'route.openshift.io/v1',
          kind: 'Route',
          metadata: {
            name: this.name
          },
          spec: {
            host: vhost,
            tls: {
              termination: 'edge'
            },
            to: {
              kind: 'Service',
              name: this.name
            }
          }
        }
        resources.push({ obj: route, name: `route-${this.name}.yaml`, layer })
      } else if (spec.ingress.nodePort) {
        const nodePortPatch = [{ op: 'replace', path: '/spec/type', value: 'NodePort' }]
        if (Array.isArray(spec.ingress.nodePort)) {
          const match = spec.ingress.nodePort.filter(obj => obj.name === this.name)
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
      } else if (spec.ingress.istio) {
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
