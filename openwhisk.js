const solsa = require('./solsa')

let ow = {
  Function: class Function extends solsa.Service {
    constructor (name, spec) {
      super(name)
      this.spec = spec
    }

    _yaml (archive) {
      let ret = {}
      ret.apiVersion = 'openwhisk.seed.ibm.com/v1beta1'
      ret.kind = 'Function'
      ret.metadata = { name: this.name }
      ret.spec = this.spec
      archive.addResource(ret, this.name + '-function.yaml')
    }
  },

  FunctionInvocation: class FunctionInvocation extends solsa.Service {
    constructor (name, spec) {
      super(name)
      this.spec = spec
    }

    _yaml (archive) {
      let ret = {}
      ret.apiVersion = 'openwhisk.seed.ibm.com/v1beta1'
      ret.kind = 'Invocation'
      ret.metadata = { name: this.name }
      ret.spec = this.spec
      archive.addResource(ret, this.name + '-functionInv.yaml')
    }
  },

  Transform: class Transform extends solsa.Service {
    constructor (name, spec) {
      super(name)
      this.func = spec.func
      this.parameters = spec.parameters
      this.to = spec.to
      this.addDependency(new ow.Function(name + '-func', {
        code: this.func().toString(),
        runtime: 'nodejs:8'
      }))
      this.addDependency(new ow.FunctionInvocation(name + '-inv', {
        function: name + '-func',
        parameters: this.parameters,
        to: {
          secretKeyRef: {
            name: this.to.name,
            key: this.to.key
          },
          projection: this.to.projection
        }
      }))
    }
  },

  Package: class Package extends solsa.Service {
    constructor (name, spec) {
      super(name)
      this.spec = spec
    }

    _yaml (archive) {
      let ret = {}
      ret.apiVersion = 'openwhisk.seed.ibm.com/v1beta1'
      ret.kind = 'Package'
      ret.metadata = { name: this.name }
      ret.spec = this.spec
      archive.addResource(ret, this.name + '-package.yaml')
    }
  },

  Rule: class Rule extends solsa.Service {
    constructor (name, spec) {
      super(name)
      this.spec = spec
    }

    _yaml (archive) {
      let ret = {}
      ret.apiVersion = 'openwhisk.seed.ibm.com/v1beta1'
      ret.kind = 'Rule'
      ret.metadata = { name: this.name }
      ret.spec = this.spec
      archive.addResource(ret, this.name + '-rule.yaml')
    }
  },

  Trigger: class Trigger extends solsa.Service {
    constructor (name, spec) {
      super(name)
      this.spec = spec
    }

    _yaml (archive) {
      let ret = {}
      ret.apiVersion = 'openwhisk.seed.ibm.com/v1beta1'
      ret.kind = 'Trigger'
      ret.metadata = { name: this.name }
      ret.spec = this.spec
      archive.addResource(ret, this.name + '-trigger.yaml')
    }
  }
}
module.exports = ow
