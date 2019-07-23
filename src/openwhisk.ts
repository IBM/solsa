import { Bundle } from './bundle'
import { dynamic, either } from './helpers'

class Action extends Bundle {
  name: string
  code: string
  runtime: string

  constructor ({ name, code, runtime = 'nodejs:default' }: { name: string, code: string, runtime?: string }) {
    super()
    this.name = name
    this.code = code
    this.runtime = runtime
  }

  get Invocation () {
    const that = this

    return class extends Invocation {
      constructor ({ name = that.name, parameters, to }: { name?: string, parameters?: dynamic, to?: dynamic } = {}) {
        super({ name, action: that.name, parameters, to })
      }
    }
  }

  getResources () {
    const obj = {
      apiVersion: 'openwhisk.seed.ibm.com/v1beta1',
      kind: 'Function',
      metadata: {
        name: this.name
      },
      spec: {
        code: this.code,
        runtime: this.runtime
      }
    }
    return [{ obj, name: this.name + '-function-openwhisk.yaml' }]
  }
}

class Invocation extends Bundle {
  name: string
  action: string
  parameters?: dynamic
  to?: dynamic

  constructor ({ name, action = name, parameters, to }: { name: string, action?: string, parameters?: dynamic, to?: dynamic }) {
    super()
    this.name = name
    this.action = action
    this.parameters = parameters
    this.to = to
  }

  getResources () {
    const obj = {
      apiVersion: 'openwhisk.seed.ibm.com/v1beta1',
      kind: 'Invocation',
      metadata: {
        name: this.name
      },
      spec: {
        function: this.action,
        parameters: this.parameters,
        to: this.to
      }
    }
    return [{ obj, name: this.name + '-invocation-openwhisk.yaml' }]
  }
}

export let openwhisk = { Action, Invocation }
