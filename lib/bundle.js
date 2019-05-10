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

module.exports = { Bundle }
