// the root of the class hierarchy
class Bundle {
  constructor () {
    this.solsa = {}
  }

  useExisting () {
    this.solsa.skip = true
    return this
  }

  getResources () {
    return this.solsa.skip ? [] : this.getAllResources()
  }

  getAllResources () {
    const resources = []
    for (let field in this) {
      if (this[field] instanceof Bundle) {
        resources.push(...this[field].getResources())
      }
    }
    return resources
  }

  getImages () {
    return this.solsa.skip ? [] : this.getAllImages()
  }

  getAllImages () {
    const images = []
    for (let field in this) {
      if (this[field] instanceof Bundle) {
        images.push(...this[field].getImages())
      }
    }
    return images
  }

  getBuilds () {
    return this.solsa.skip ? [] : this.getAllBuilds()
  }

  getAllBuilds () {
    const builds = []
    for (let field in this) {
      if (this[field] instanceof Bundle) {
        builds.push(...this[field].getBuilds())
      }
    }
    return builds
  }

  getExposedServices() {
    return this.solsa.skip ? [] : this.getAllExposedServices()
  }

  getAllExposedServices() {
    const exposed = []
    for (let field in this) {
      if (this[field] instanceof Bundle) {
        exposed.push(...this[field].getExposedServices())
      }
    }
    return exposed
  }
}

class Service extends Bundle {
  constructor(name, ports) {
    super()
    this.name = name
    this.ports = ports
  }

  expose () {
    let ports = Object.keys(this.ports)
    if (ports.len > 1) {
      throw "Must provide explicit port/path mapping for a multi-port Service"
    }
    this.exposePaths(ports.map(p => { return { paths: ['/'], port: { name: p, port: this.ports[p] }}}))
  }

  exposePaths (paths) {
    this.solsa.exposed = true
    this.solsa.exposedPaths = paths
  }

  getExposedServices() {
    return this.solsa.exposed ? [{ service: this, endpoints: this.solsa.exposedPaths }] : []
  }
}

module.exports = { Bundle, Service }
