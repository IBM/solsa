import * as solsa from '..'
let bundle = new solsa.Bundle()
export = bundle

bundle.action = new solsa.openwhisk.Action({ name: 'echo', code: 'function main (obj) { return obj }' })
bundle.invocation = new bundle.action.Invocation({ parameters: {} })
