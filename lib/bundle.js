class Bundle {
  constructor () {
    this.solsa = {}
  }

  useExisting () {
    this.solsa.skip = true
    return this
  }

  getResources (userConfig = {}) {
    return this.solsa.skip ? [] : this.getAllResources(...arguments)
  }

  getAllResources (userConfig = {}) {
    const resources = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        resources.push(...this[key].getResources(...arguments))
      }
    }
    return resources
  }

  getImages (userConfig = {}) {
    return this.solsa.skip ? [] : this.getAllImages(...arguments)
  }

  getAllImages (userConfig = {}) {
    const images = []
    for (let key in this) {
      if (this[key] instanceof Bundle) {
        images.push(...this[key].getImages(...arguments))
      }
    }
    return images
  }

  getBuilds (userConfig = {}) {
    return this.solsa.skip ? [] : this.getAllBuilds(...arguments)
  }

  getAllBuilds (userConfig = {}) {
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
