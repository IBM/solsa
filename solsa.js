const fs = require('fs')
const path = require('path')

// import all libs
fs.readdirSync(path.join(__dirname, 'lib')).map(file => Object.assign(module.exports, require(path.join(__dirname, 'lib', file))))
