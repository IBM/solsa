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

import * as fs from 'fs'
import * as minimist from 'minimist'
import * as util from 'util'
import * as yaml from 'js-yaml'

const commands: { [key: string]: () => void } = { import: importCommand }

// process command line arguments

const argv = minimist(process.argv.slice(2), {
  string: ['output', 'dehelm'],
  boolean: ['function', 'extern'],
  alias: { output: 'o', function: 'f', extern: 'e' },
  default: { output: 'myApp', 'dehelm': true, function: false, extern: false }
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
  console.error('      --dehelm               remove helm chart artifacts during import (default true)')
  console.error('  -f  --function             export a function that wraps bundle creation (default false)')
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

function snakeToCamel (str: string) {
  return str.replace(/([-_][a-z])/g, (n: string) => n.toUpperCase().replace('-', '').replace('_', ''))
}

function writePreamble (outStream: fs.WriteStream) {
  outStream.write('/* eslint-disable no-template-curly-in-string */\n')
  outStream.write('// @ts-check\n')
  outStream.write('const solsa = require(\'solsa\')\n\n')

  if (!argv.function) {
    outStream.write('const app = new solsa.Bundle()\n')
    outStream.write('module.exports = app\n')
  } else {
    outStream.write(`module.exports = function ${snakeToCamel(argv.output)} () {\n`)
    outStream.write('const app = new solsa.Bundle()\n')
  }
}

function writeEpilogue (outStream: fs.WriteStream) {
  if (argv.function) {
    outStream.write('return app\n')
    outStream.write('}\n')
  }
}

function isExcludedHelmArtifact (obj: any): boolean {
  if (obj.metadata && obj.metadata.annotations && 'helm.sh/hook' in obj.metadata.annotations) {
    return true
  }
  return false
}

function mapToSolsaType (apiVersion: string, kind: string): string {
  apiVersion = apiVersion.replace('.k8s.io', '').replace('/', '.').replace('rbac.authorization', 'rbac')
  if (apiVersion === 'v1') {
    if (kind === 'APIGroup' || kind === 'APIGroupList' || kind === 'APIResourceList' || kind === 'APIVersions' ||
      kind === 'DeleteEvent' || kind === 'Status' || kind === 'WatchEvent') {
      apiVersion = 'meta.v1'
    } else {
      apiVersion = 'core.v1'
    }
  }
  return `${apiVersion}.${kind}`
}

class Text {
  text: string
  key: string

  static count: number = 0

  constructor (text: string, key: string = '') {
    this.text = text
    this.key = key
  }

  [util.inspect.custom] () {
    const count = this.text.split('\n').length
    if (count < 50) return util.inspect(this.text)
    let filename = `${argv.output}-${++Text.count}`
    if (/^[0-9a-zA-Z _\-\._]+$/.test(this.key)) {
      filename += '-' + this.key
    }
    if (!this.key.includes('.')) {
      try {
        JSON.parse(this.text)
        filename += '.json'
      } catch (error) {
        filename += '.txt'
      }
    }
    fs.writeFileSync(filename, this.text)
    return `require('fs').readFileSync('${filename}').toString()`
  }
}

function wrap (val: any, key?: string): any {
  if (val == null) return val
  switch (typeof val) {
    case 'string':
      return new Text(val, key)
    case 'object':
      if (Array.isArray(val)) return val.map(val => wrap(val)) // return new array
      for (let key of Object.keys(val)) val[key] = wrap(val[key], key) // update object in place
  }
  return val
}

function importCommand () {
  const inspectOpts = { depth: null, maxArrayLength: null, compact: 4, breakLength: 100 }
  const resources = loadObjects(argv.file).filter(x => x != null)
  const outStream = fs.createWriteStream(`${argv.output}.js`)
  writePreamble(outStream)

  resources.forEach(function (val, index) {
    if (argv.dehelm) {
      if (isExcludedHelmArtifact(val)) {
        return
      }
      if (val.metadata && val.metadata.labels) {
        delete val.metadata.labels['helm.sh/chart']
      }
    }
    outStream.write('\n')
    let specialized = false
    if (val.apiVersion && val.kind) {
      const apiVersion = val.apiVersion
      const kind = val.kind
      const solsaType = mapToSolsaType(apiVersion, kind)
      if (solsaType !== 'unknown') {
        specialized = true
        delete val.kind
        delete val.apiVersion
        let varName = `resource_${index}`
        if (val.metadata && val.metadata.name) {
          varName = snakeToCamel(val.metadata.name)
          if (!varName.endsWith(kind)) {
            varName = `${varName}_${kind}`
          }
        }
        outStream.write(`app.${varName} = new solsa.${solsaType}(`)
        outStream.write(util.inspect(argv.extern ? wrap(val) : val, inspectOpts))
        outStream.write(')\n')
      }
    }
    if (!specialized) {
      outStream.write(`app.rawResource_${index} = new solsa.KubernetesResource(`)
      outStream.write(util.inspect(argv.extern ? wrap(val) : val, inspectOpts))
      outStream.write(')\n')
    }
  })

  writeEpilogue(outStream)

  outStream.end()
}

// process command

commands[argv.command]()

if (warnings) {
  console.error('Warnings: ' + warnings)
}
