const fs = require('fs')
const path = require('path')

// import all libs
for (let file of fs.readdirSync(path.join(__dirname, 'lib'))) {
  Object.assign(module.exports, require(path.join(__dirname, 'lib', file)))
}
