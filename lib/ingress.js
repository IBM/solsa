const { Bundle } = require('./bundle')

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

  getAllExposedServices () {
    return [{ name: this.name, endpoints: this.endpoints }]
  }
}

module.exports = { Ingress }
