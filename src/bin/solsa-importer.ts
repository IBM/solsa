#!/usr/bin/env node

/*
 * Copyright 2019 IBM Corporation
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

import * as cp from 'child_process'
import * as fs from 'fs'
import * as minimist from 'minimist'
import * as os from 'os'
import * as path from 'path'
import * as util from 'util'
import * as yaml from 'js-yaml'
import { Resource, KubernetesResource } from '../solution'
import { WriteStream } from 'tty'

const commands: { [key: string]: () => void } = { import: importCommand }

// process command line arguments

const argv = minimist(process.argv.slice(2), {
  string: ['output'],
  alias: { output: 'o' },
  default: { output: 'myApp.js' }
})

argv.command = argv._[0]
argv.file = argv._[1]

if (argv._.length !== 2 || !Object.keys(commands).includes(argv.command)) {
  console.error('Usage:')
  console.error('  solsa-import <command> [flags]')
  console.error()
  console.error('Available commands:')
  console.error('  import <resources.yaml>    import yaml resources')
  console.error()
  console.error('Global flags:')
  console.error()
  console.error(`Flags for "import" command:`)
  console.error('  -o, --output <file>        output imported resources to <file>.js')
  console.error()
  process.exit(1)
}

// handle errors and warnings

let warnings = 0

function reportError (msg: string, fatal?: boolean) {
  if (fatal) {
    const err = new Error(msg)
    throw err
  } else {
    console.error('Warning:', msg)
    warnings++
  }
}

function loadObjects (fileName: string): any[] {
  try {
    const inputString = fs.readFileSync(fileName).toString()
    const pieces = inputString.split(new RegExp('^---+$', 'm'))
    const resources = pieces.map(x => yaml.safeLoad(x))
    return resources
  } catch (err) {
    reportError(err)
    return []
  }
}

function writePreamble (outStream: fs.WriteStream) {
  outStream.write('const solsa = require(\'solsa\')\n')
  outStream.write('const app = new solsa.Bundle()\n')
  outStream.write('module.exports = app\n')
  outStream.write('\n')
}

function importCommand () {
  const resources = loadObjects(argv.file).filter(x => x != null)
  const outStream = fs.createWriteStream(argv.output)
  writePreamble(outStream)

  resources.forEach(function (val, index) {
    outStream.write(`app.var${index} = new solsa.KubernetesResource(`)
    outStream.write(util.inspect(val, { depth: null, maxArrayLength: null, compact: false }))
    outStream.write(')\n')
  })

  outStream.end()
}

// process command

commands[argv.command]()

if (warnings) {
  console.error('Warnings: ' + warnings)
}
