#!/usr/bin/env node

let yaml = require('js-yaml')
const minimist = require('minimist')
const fs = require('fs')
const archiver = require('archiver')

function setupArchiver (chartName) {
  var output = fs.createWriteStream(chartName + '.tar.gz')
  var archive = archiver('tar', {
    gzip: true,
    zlib: { level: 9 }
  })

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.')
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output)

  return archive
}

function generateChartSkeleton (archive, app, version) {
  const c = {
    apiVersion: 'v1',
    name: app.name,
    version: version
  }
  archive.append(yaml.safeDump(c, { noArrayIndent: true }), { name: app.name + '/Chart.yaml' })

  const v = {
    solsa: {
      docker: {
        registry: 'us.icr.io/solsa'
      },
      ingress: {
        subdomain: null,
        secret: null
      }
    }
  }
  archive.append(yaml.safeDump(v, { noArrayIndent: true }), { name: app.name + '/values.yaml' })

  return app.name + '/templates/'
}

const argv = minimist(process.argv.slice(2), {
  default: { target: 'kubernetes', output: 'my-chart', version: '1.0.0' },
  boolean: ['ingress'],
  alias: { target: 't', output: 'o', version: 'v' },
  string: ['target', 'output', 'version']
})

const archive = setupArchiver(argv.output)
const theApp = require(require('path').resolve(argv._[0]))
const templateDir = generateChartSkeleton(archive, theApp, argv.version)
theApp._helm(archive, argv.target, templateDir, argv.ingress)

archive.finalize()
