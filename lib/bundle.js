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
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        resources.push(...this[key].getResources())
      }
    }
    return resources
  }

  getImages () {
    return this.solsa.skip ? [] : this.getAllImages()
  }

  getAllImages () {
    const images = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        images.push(...this[key].getImages())
      }
    }
    return images
  }

  getBuilds () {
    return this.solsa.skip ? [] : this.getAllBuilds()
  }

  getAllBuilds () {
    const builds = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        builds.push(...this[key].getBuilds())
      }
    }
    return builds
  }

  getExposedServices () {
    return this.solsa.skip ? [] : this.getAllExposedServices()
  }

  getAllExposedServices () {
    const exposed = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        exposed.push(...this[key].getExposedServices())
      }
    }
    return exposed
  }
}

class Service extends Bundle {
  constructor ({ name, ports = { http: 8080 } }) {
    super()
    this.name = name
    this.ports = ports
  }

  expose () {
    let names = Object.keys(this.ports)
    if (names.len > 1) {
      throw "Must provide explicit port/path mapping for a multi-port Service"
    }
    this.exposePaths(names.map(name => ({ paths: ['/'], port: { name, number: this.ports[name] } })))
  }

  exposePaths (paths) {
    this.solsa.exposedPaths = paths
  }

  getExposedServices () {
    return this.solsa.exposedPaths ? [{ name: this.name, endpoints: this.solsa.exposedPaths }] : []
  }
}

module.exports = { Bundle, Service }
