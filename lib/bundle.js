const merge = require('deepmerge')

class Bundle {
  constructor () {
    this.solsa = {}
  }

  useExisting () {
    this.solsa.skip = true
    return this
  }

  getResources () {
    if (this.solsa.skip) return []
    const objs = this.getAllResources(...arguments)
    if (Array.isArray(this.solsa.patches)) {
      for (let i = 0; i < objs.length; i++) {
        if (this.solsa.patches[i]) objs[i].obj = merge(objs[i].obj, this.solsa.patches[i])
      }
    } else if (this.solsa.patches) {
      objs[0].obj = merge(objs[0].obj, this.solsa.patches)
    }
    return objs
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

class Resource extends Bundle {
  constructor ({ name, object }) {
    super()
    this.name = name
    this.object = object
  }

  getAllResources () {
    return [{ obj: merge({ metadata: { name: this.name } }, this.object || {}), name: this.name + '-resource.yaml' }]
  }
}

module.exports = { Bundle, Resource }
