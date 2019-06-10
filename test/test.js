/* eslint-env mocha */

// run "npm test" to run the tests
// run "node test.js" to regenerate the tests

'use strict'

const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const path = require('path')

const cli = path.join(__dirname, '..', 'bin', 'solsa.js')
const dir = path.join(__dirname, 'yaml')
const config = path.join(__dirname, 'solsa.yaml')
const ext = '.yaml'

function solsaYaml (name) {
  return cp.execSync(`${cli} yaml --config ${config} --cluster test ${path.join(dir, name)}`)
}

function test () {
  for (const { name } of fs.readdirSync(dir).map(path.parse).filter(({ ext }) => ext.toLowerCase() === '.js')) {
    it(name, function () {
      assert.strictEqual(solsaYaml(name).toString(), fs.readFileSync(path.format({ dir, name, ext })).toString())
    })
  }
}

function testgen () {
  for (const { name } of fs.readdirSync(dir).map(path.parse).filter(({ ext }) => ext.toLowerCase() === '.js')) {
    console.log('Generating', path.format({ name, ext }))
    fs.writeFileSync(path.format({ dir, name, ext }), solsaYaml(name))
  }
}

if (typeof it === 'function') test(); else testgen()
