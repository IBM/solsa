#!/usr/bin/env node

let name = require(require('path').resolve(process.argv[2])).name.toLowerCase()
console.log('solsa' + '-' + name)
