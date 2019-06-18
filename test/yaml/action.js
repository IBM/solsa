let solsa = require('solsa')
let bundle = new solsa.Bundle()
module.exports = bundle

bundle.action = new solsa.openwhisk.Action({ name: 'echo', code: 'function main (obj) { return obj }' })
bundle.invocation = new bundle.action.Invocation({ parameters: {} })
