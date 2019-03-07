#!/usr/bin/env node

const minimist = require('minimist')

const argv = minimist(process.argv.slice(2), {
  default: { registry: process.env.REGISTRY },
  alias: { registry: 'r' },
  string: ['registry', 'r']
})

if (argv._.length !== 1) {
  console.error('Usage:')
  console.error('  solsa-name service [flags]')
  console.error('Flags:')
  console.error('  -r, --registry         name of the container registry')
  process.exit(1)
}

let name = require(require('path').resolve(argv._[0])).name.toLowerCase()
console.log((argv.registry ? argv.registry + '/' : '') + 'solsa' + '-' + name)
