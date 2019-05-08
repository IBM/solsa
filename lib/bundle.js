// the root of the class hierarchy
class Bundle {
  constructor () {
    this.solsa = {}
  }

  getConfig () {
    return {}
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
}

// TODO a bundle that can be exposed with an ingress
class Service extends Bundle {
  expose () { }
}

module.exports = { Bundle, Service }
