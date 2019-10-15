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

import * as minimist from 'minimist'
import * as path from 'path'
import { runCommand } from '../cli'

const Module = require('module')

const args = process.argv.slice(2)

const argv = minimist(args, {
  boolean: ['debug'],
  alias: { debug: 'd' }
})

if (argv._.length !== 2) runCommand([]) // usage

if (argv._[0] === 'import' || argv._[0] === 'normalize') {
  runCommand(args)
} else {

  const file = path.resolve(argv._[1])

  // resolve solsa module to current module if not found
  let _resolveFilename = Module._resolveFilename
  Module._resolveFilename = function (request: string, parent: string) {
    if (request.startsWith('solsa')) {
      try {
        return _resolveFilename(request, parent)
      } catch (error) {
        return require.resolve(request.replace('solsa', '..'))
      }
    } else {
      return _resolveFilename(request, parent)
    }
  }

  let solution: any

  try {
    solution = require(file)
    if (!solution.runCommand) throw new Error(`Module '${file}' does not export a SolSA solution`)
    solution.runCommand(args, solution)
  } catch (err) {
    console.error(argv.debug ? err : `Error: ${err.message}`)
    process.exit(1)
  }
}
