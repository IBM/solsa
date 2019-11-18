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
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as dp from 'dot-prop'
let deepMixIn = require('mout/object/deepMixIn')

const Module = require('module')

const args = process.argv.slice(2)

const argv = minimist(args, {
  string: ['values', 'set'],
  boolean: ['debug'],
  alias: { debug: 'd', set: 's', values: 'f' }
})

if (argv._.length === 0) runCommand([]) // usage

if (argv._[0] === 'help') {
  runCommand(args)
} else if (argv._[0] === 'import' || argv._[0] === 'normalize') {
  if (argv._.length !== 2) runCommand([]) // usage
  runCommand(args)
} else {
  if (argv._.length !== 2) runCommand([]) // usage
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
    const solutionDir = path.dirname(require.resolve(file))
    const solutionContext = constructContext(solutionDir, argv)
    solution = require(file)
    if (!solution.runCommand) {
      // See if the file exports a function that can be applied to construct a Solution.
      if (typeof solution === 'function') {
        solution = solution(solutionContext)
      }
      if (!solution.runCommand) throw new Error(`A SolSA solution cannot be constructed from '${file}'`)
    }
    solution.runCommand(args, solution)
  } catch (err) {
    console.error(argv.debug ? err : `Error: ${err.message}`)
    process.exit(1)
  }
}

function constructContext (solutionDir: string, argv: minimist.ParsedArgs): { [k: string]: any } {
  let solutionContext = {}
  const valuesFile = path.join(solutionDir, 'values.yaml')
  if (fs.existsSync(valuesFile)) {
    try {
      solutionContext = yaml.safeLoad(fs.readFileSync(valuesFile).toString())
      if (argv.debug) {
        console.error(`Loaded ${valuesFile}`)
        console.error(yaml.safeDump(solutionContext))
      }
    } catch (err) {
      console.error('Error loading yaml from file ${valuesFile}')
      throw err
    }
  }

  // process set options
  if (argv.set) {
    const setArgs: string[] = typeof argv.set === 'string' ? [ argv.set ] : argv.set
    setArgs.forEach(element => {
      element.split(',').forEach(arg => {
        const idx = arg.indexOf('=')
        if (idx !== -1) {
          const path = arg.substr(0, idx)
          const value = arg.substr(idx + 1)
          dp.set(solutionContext, path, value)
          if (argv.debug) {
            console.error(`set ${path} to ${value}`)
          }
        }
      })
    })
  }

  // process value options
  if (argv.values) {
    const valArgs: string[] = typeof argv.values === 'string' ? [ argv.values ] : argv.values
    valArgs.forEach(fname => {
      const vf = path.isAbsolute(fname) ? fname : path.join(process.cwd(), fname)
      if (fs.existsSync(vf)) {
        try {
          const delta = yaml.safeLoad(fs.readFileSync(vf).toString())
          if (argv.debug) {
            console.error(`merging values from ${vf}`)
          }
          deepMixIn(solutionContext, delta)
        } catch (err) {
          console.error(`Error processing ${vf}`)
          throw err
        }
      }
    })
  }

  if (argv.debug) {
    console.error('Final value of Solution Config')
    console.error(yaml.safeDump(solutionContext))
  }

  return solutionContext
}
