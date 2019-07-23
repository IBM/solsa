import * as merge from 'deepmerge'
import { dynamic } from './helpers'

export class Solsa {
  [k: string]: any
  bundle: Bundle

  constructor (bundle: Bundle) {
    this.bundle = bundle
  }

  getResources (...args: any[]) {
    if (this.skip) return []
    const objs = this.bundle.getResources(...args)
    if (Array.isArray(this.patches)) {
      for (let i = 0; i < objs.length; i++) {
        if (this.patches[i]) objs[i].obj = merge(objs[i].obj, this.patches[i])
      }
    } else if (this.patches) {
      objs[0].obj = merge(objs[0].obj, this.patches)
    }
    return objs
  }

  getImages () {
    return this.skip ? [] : this.bundle.getImages()
  }
}

export class Bundle {
  [k: string]: any
  solsa = new Solsa(this)

  useExisting () {
    this.solsa.skip = true
    return this
  }

  getResources (...args: any[]): dynamic[] {
    const resources = []
    for (let value of Object.values(this)) {
      if (value instanceof Bundle) {
        resources.push(...value.solsa.getResources(...args))
      }
    }
    return resources
  }

  getImages (): { name: string, build?: string, main?: string }[] {
    const images = []
    for (let value of Object.values(this)) {
      if (value instanceof Bundle) {
        images.push(...value.solsa.getImages())
      }
    }
    return images
  }
}

export class Resource extends Bundle {
  name: string
  object: dynamic

  constructor ({ name, object }: { name: string, object: dynamic }) {
    super()
    this.name = name
    this.object = object
  }

  getResources () {
    return [{ obj: merge({ metadata: { name: this.name } }, this.object), name: this.name + '-resource.yaml' }]
  }
}
