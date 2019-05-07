const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function mergeResources (x, y) {
  for (let layer in y) {
    x[layer] = Object.assign({}, x[layer], y[layer])
  }
}

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
    return this.solsa.skip ? {} : this.getAllResources()
  }

  getAllResources () {
    const resources = {}
    for (let field in this) {
      if (this[field] instanceof Bundle) {
        mergeResources(resources, this[field].getResources())
      }
    }
    return resources
  }

  getImages () {
    return this.solsa.skip ? {} : this.getAllImages()
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
    return this.solsa.skip ? {} : this.getAllBuilds()
  }

  getAllBuilds () {
    const builds = {}
    for (let field in this) {
      if (this[field] instanceof Bundle) {
        Object.assign(builds, this[field].getBuilds())
      }
    }
    return builds
  }

  // TODO move to cli
  toYaml (folder = 'yaml') {
    const resources = this.getResources()

    if (fs.existsSync(folder)) {
      console.error(`Folder '${folder}' already exits. Aborting...`)
      process.exit(1)
    }
    fs.mkdirSync(folder)
    for (let layer in resources) {
      const p = path.join(folder, layer)
      fs.mkdirSync(p)
      for (let name in resources[layer]) {
        fs.writeFileSync(path.join(p, name), yaml.safeDump(resources[layer][name], { noArrayIndent: true }), { encoding: 'utf-8' })
      }

      const kustomization = {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        resources: Object.keys(resources[layer])
      }
      fs.writeFileSync(path.join(p, 'kustomization.yaml'), yaml.safeDump(kustomization, { noArrayIndent: true }), { encoding: 'utf-8' })
    }

    const kustomization = {
      apiVersion: 'kustomize.config.k8s.io/v1beta1',
      kind: 'Kustomization',
      bases: Object.keys(resources).map(name => '../' + name)
    }
    const p = path.join(folder, 'default')
    fs.mkdirSync(p)
    fs.writeFileSync(path.join(p, 'kustomization.yaml'), yaml.safeDump(kustomization, { noArrayIndent: true }), { encoding: 'utf-8' })
    console.error(`Generated YAML in folder '${folder}'.`)
  }
}

// TODO a bundle that can be exposed with an ingress
class Service extends Bundle {
  expose () { }
}

// utilities

function addResource (resources, obj, name, layer = 'base') {
  resources[layer] = resources[layer] || {}
  resources[layer][name] = obj
}

module.exports = { addResource, Bundle, Service }
