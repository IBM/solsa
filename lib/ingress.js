const { Bundle } = require('./bundle')

let portsUsed = 0

class Ingress extends Bundle {
  constructor ({ name, ports = [8080], endpoints }) {
    super()
    this.name = name
    if (endpoints) {
      this.endpoint = endpoints
    } else {
      if (typeof ports === 'number') ports = [ports]
      if (typeof ports === 'object' && !Array.isArray(ports)) ports = Object.values(ports)
      if (ports.length !== 1) {
        throw new Error('Must provide explicit port/path mapping for a multi-port Service')
      }
      this.endpoints = [{ paths: ['/'], port: ports[0] }]
    }
  }

  getResources ({ config = {} } = {}) {
    let resources = []

    const paths = []
    this.endpoints.forEach(endpoint => paths.push(...endpoint.paths.map(path => ({ path, backend: { serviceName: this.name, servicePort: endpoint.port } }))), [])

    for (const context of config.contexts || []) {
      if (context.ingress.iks) {
        const vhost = this.name + '.' + context.ingress.iks.subdomain
        const ingress = {
          apiVersion: 'extensions/v1beta1',
          kind: 'Ingress',
          metadata: {
            name: this.name + '-ing-iks',
            labels: {
              'solsa.ibm.com/name': this.name
            }
          },
          spec: {
            tls: [{
              hosts: [vhost],
              secretName: context.ingress.iks.tlssecret
            }],
            rules: [{
              host: vhost,
              http: {
                paths
              }
            }]
          }
        }
        resources.push({ obj: ingress, name: `ingress-${this.name}.yaml`, layer: context.name })
      } else if (context.ingress.nodePort) {
        const port = context.ingress.nodePort + portsUsed++
        const nodePortPatch = [
          {
            op: 'replace',
            path: '/spec/type',
            value: 'NodePort'
          }, {
            op: 'add',
            path: '/spec/ports/0/nodePort',
            value: port
          }
        ]
        const nodePortPatchTarget = {
          target: {
            version: 'v1',
            kind: 'Service',
            name: this.name
          },
          path: `expose-svc-${this.name}-${port}.yaml`
        }
        resources.push({ JSONPatch: nodePortPatch, JSONPatchTarget: nodePortPatchTarget, layer: context.name })
      } else if (context.ingress.istio) {
        const gw = {
          apiVersion: 'networking.istio.io/v1alpha3',
          kind: 'Gateway',
          metadata: {
            name: this.name + '-gw',
            labels: {
              'solsa.ibm.com/name': this.name
            }
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
        resources.push({ obj: gw, name: `gw-${this.name}.yaml`, layer: context.name })
        const vs = {
          apiVersion: 'networking.istio.io/v1alpha3',
          kind: 'VirtualService',
          metadata: {
            name: this.name + '-vs',
            labels: {
              'solsa.ibm.com/name': this.name
            }
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
        resources.push({ obj: vs, name: `vs-${this.name}.yaml`, layer: context.name })
      }
    }
    return resources
  }
}

module.exports = { Ingress }
