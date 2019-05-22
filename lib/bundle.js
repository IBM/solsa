class Bundle {
  constructor () {
    this.solsa = {}
  }

  useExisting () {
    this.solsa.skip = true
    return this
  }

  getResources () {
    return this.solsa.skip ? [] : this.getAllResources(...arguments)
  }

  getAllResources () {
    const resources = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        resources.push(...this[key].getResources(...arguments))
      }
    }
    return resources
  }

  getImages () {
    return this.solsa.skip ? [] : this.getAllImages(...arguments)
  }

  getAllImages () {
    const images = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        images.push(...this[key].getImages(...arguments))
      }
    }
    return images
  }

  getBuilds () {
    return this.solsa.skip ? [] : this.getAllBuilds(...arguments)
  }

  getAllBuilds () {
    const builds = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        builds.push(...this[key].getBuilds(...arguments))
      }
    }
    return builds
  }
}

module.exports = { Bundle }
