import { Bundle } from './bundle'
import { dynamic } from './helpers'

export class Core extends Bundle {
  constructor (schema: { apiVersion: string, kind: string, metadata?: boolean, spec?: boolean }, args: any) {
    super()
    this.solsa.schema = schema
    Object.assign(this, args)
  }

  getResources () {
    const obj: dynamic = {
      apiVersion: this.solsa.schema.apiVersion,
      kind: this.solsa.schema.kind
    }
    const that = Object.assign({}, this)
    delete that.solsa
    if (this.solsa.schema.metadata) {
      obj.metadata = { name: this.name, labels: this.labels, annotations: this.annotations }
      delete that.name
      delete that.labels
      delete that.annotations
    }
    if (this.solsa.schema.spec) {
      const spec = Object.assign({}, that.spec)
      delete that.spec
      obj.spec = Object.assign(spec, that)
    } else {
      Object.assign(obj, that)
    }
    return [{ obj, name: this.name + '-' + this.solsa.schema.apiVersion.replace(/[./]/g, '-') + '-' + this.solsa.schema.kind + '.yaml' }]
  }
}
