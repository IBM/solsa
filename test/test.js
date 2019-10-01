/*
 * Copyright IBM Corporation 2019
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// run "npm test" to run the tests
// run "node test.js" to regenerate the tests

// @ts-check

/* eslint-env mocha */

'use strict'

const assert = require('assert')
const cp = require('child_process')
const fs = require('fs')
const path = require('path')

const cli = path.join(__dirname, '..', 'dist', 'bin', 'solsa.js')
const src = path.join(__dirname, '..', 'dist', 'test')
const dir = path.join(__dirname, 'yaml')
const config = path.join(__dirname, 'solsa.yaml')
const ext = '.yaml'

/** @param {string} name */
function solsaYaml (name) {
  return cp.execSync(`${cli} yaml --config ${config} --cluster iks ${path.join(src, name)}`)
}

function test () {
  for (const { name } of fs.readdirSync(src).map(path.parse).filter(({ ext }) => ext.toLowerCase() === '.js')) {
    it(name, function () {
      assert.strictEqual(solsaYaml(name).toString(), fs.readFileSync(path.format({ dir, name, ext })).toString())
    })
  }

  it('helloWorld', function () {
    assert.strictEqual(
      cp.execSync(`${cli} yaml --config ${config} --cluster nodeport ${path.join(__dirname, '..', 'samples', 'helloWorld.js')}`).toString(),
      fs.readFileSync(path.join(__dirname, '..', 'samples', 'helloWorld.yaml')).toString())
  })
}

function testgen () {
  for (const { name } of fs.readdirSync(src).map(path.parse).filter(({ ext }) => ext.toLowerCase() === '.js')) {
    console.log('Generating', path.format({ name, ext }))
    fs.writeFileSync(path.format({ dir, name, ext }), solsaYaml(name))
  }
}

if (typeof describe === 'function') test(); else testgen()
