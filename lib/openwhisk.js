const { Bundle } = require('./bundle')
const { either } = require('../helpers')

class Action extends Bundle {
  constructor ({ name, code, runtime }) {
    super()
    this.name = name
    this.code = code
    this.runtime = runtime

    const that = this

    this.Invocation = class extends Invocation {
      get name () { return either(this._name, that.name) }
      set name (val) { this._name = val }
    }
  }

  get runtime () { return either(this._runtime, 'nodejs:default') }
  set runtime (val) { this._runtime = val }

  getAllResources () {
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
  constructor ({ name, action, parameters, to }) {
    super()
    this.name = name
    this.action = action
    this.parameters = parameters
    this.to = to
  }

  get action () { return either(this._action, this.name) }
  set action (val) { this._action = val }

  getAllResources () {
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

module.exports = { openwhisk: { Action, Invocation } }
