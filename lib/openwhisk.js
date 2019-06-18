const { Bundle } = require('./bundle')

class Action extends Bundle {
  constructor ({ name, code, runtime = 'nodejs:default' }) {
    super()
    this.name = name
    this.code = code
    this.runtime = runtime
  }

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
  constructor ({ name, action = name, parameters, to }) {
    super()
    this.name = name
    this.action = action
    this.parameters = parameters
    this.to = to
  }

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
