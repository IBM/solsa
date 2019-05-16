const { Bundle } = require('./bundle')

var portsUsed = 0

class Ingress extends Bundle {
  constructor ({ name, ports = { http: 8080 }, endpoints }) {
    super()
    this.name = name
    if (endpoints) {
      this.endpoint = endpoints
    } else {
      let names = Object.keys(ports)
      if (names.len > 1) {
        throw new Error('Must provide explicit port/path mapping for a multi-port Service')
      }
      this.endpoints = names.map(name => ({ paths: ['/'], port: { name, number: ports[name] } }))
    }
  }

  getResources ({ userConfig = {} }) {
    let resources = []

    for (const cluster of userConfig.clusters || []) {
      if (cluster.ingress.iks) {
        const vhost = this.name + '.' + cluster.ingress.iks.subdomain
        const myName = this.name
        const ingress = {
          apiVersion: 'extensions/v1beta1',
          kind: 'Ingress',
          metadata: {
            name: myName + '-ing-iks',
            labels: {
              'solsa.ibm.com/name': myName
            }
          },
          spec: {
            tls: [{
              hosts: [vhost],
              secretName: cluster.ingress.iks.tlssecret
            }],
            rules: [{
              host: vhost,
              http: {
                paths: this.endpoints.flatMap(function (ep) {
                  const rules = []
                  ep.paths.map(function (p) {
                    rules.push({
                      path: p,
                      backend: {
                        serviceName: myName,
                        servicePort: ep.port.name
                      }
                    })
                  })
                  return rules
                })
              }
            }]
          }
        }
        resources.push({ obj: ingress, name: `ingress-${this.name}.yaml`, layer: cluster.name })
      } else if (cluster.ingress.nodePort) {
        const port = cluster.ingress.nodePort + portsUsed++
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
        resources.push({ JSONPatch: nodePortPatch, JSONPatchTarget: nodePortPatchTarget, layer: cluster.name })
      } else if (cluster.ingress.istio) {
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
        resources.push({ obj: gw, name: `gw-${this.name}.yaml`, layer: cluster.name })
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
            http: this.endpoints.flatMap(function (ep) {
              return {
                match: ep.paths.map(function (p) {
                  return {
                    uri: { exact: p }
                  }
                }),
                route: [{
                  destination: {
                    host: this.name,
                    port: { number: ep.port.number }
                  }
                }]
              }
            })
          }
        }
        resources.push({ obj: vs, name: `vs-${this.name}.yaml`, layer: cluster.name })
      }
    }
    return resources
  }
}

module.exports = { Ingress }
