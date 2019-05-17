#!/usr/bin/env node

const cp = require('child_process')
const fs = require('fs')
const minimist = require('minimist')
const os = require('os')
const path = require('path')
const tmp = require('tmp')
const yaml = require('js-yaml')

tmp.setGracefulCleanup()

const argv = minimist(process.argv.slice(2), {
  default: { config: process.env.SOLSA_CONFIG || path.join(os.homedir(), '.solsa.yaml') },
  alias: { config: 'c' },
  string: ['config', 'push']
})

if (argv._.length !== 1) {
  console.error('Usage:')
  console.error('  solsa-build path [flags]')
  console.error('Flags:')
  console.error('  -c, --config CONFIG  parse CONFIG file')
  console.error('  --push CLUSTER       push images to CLUSTER')
  process.exit(1)
}

function build ({ name, build, main = '.' }, tags = [], push) {
  console.log(`Building image "${name}" with tags ${tags.map(tag => `"${tag}"`).join(', ')}`)
  if (!fs.existsSync(path.join(build, 'package.json'))) {
    console.error(`Missing package.json in ${build}`)
    process.exit(1)
  }

  if (!fs.existsSync(path.join(build, 'node_modules'))) {
    console.log('Running npm install')
    cp.execSync('npm install --prod --no-save', { cwd: build, stdio: [0, 1, 2] })
  }

  console.log('Copying files to temporary folder')
  const dir = tmp.dirSync({ mode: '0755', prefix: 'solsa_', unsafeCleanup: true })
  cp.execSync(`rsync -rL --exclude=.git . "${dir.name}"`, { cwd: build, stdio: [0, 1, 2] })

  console.log('Running docker build')
  cp.execSync(`docker build -f node_modules/solsa/Dockerfile "${dir.name}" --build-arg MAIN=${main} ${tags.map(tag => `-t "${tag}"`).join(' ')}`, { cwd: build, stdio: [0, 1, 2] })

  console.log('Reclaiming temporary folder')
  dir.removeCallback()

  if (push) {
    console.log(`Running docker push "${push}"`)
    cp.execSync(`docker push "${push}"`, { stdio: [0, 1, 2] })
  }

  console.log()
}

const config = fs.existsSync(argv.config) ? yaml.safeLoad(fs.readFileSync(argv.config, 'utf8')) : { clusters: [] }

if (argv.push && !config.clusters.find(cluster => cluster.name === argv.push)) {
  console.error(`Cannot find cluster "${argv.push}" in configuration file`)
  process.exit(1)
}

let apps = require(path.resolve(argv._[0]))
if (!Array.isArray(apps)) apps = [apps]
const images = []
for (let app of apps) {
  images.push(...app.getBuilds())
}
for (let name of new Set(images.map(image => image.name))) {
  const image = images.find(image => image.name === name)
  const tags = []
  let push
  for (let cluster of config.clusters) {
    let tag = rename(name, cluster)
    if (!tags.includes(tag)) tags.push(tag)
    if (cluster.name === argv.push) push = tag
  }
  build(image, tags, push)
}

function rename (name, cluster) {
  const pos = name.indexOf(':', name.indexOf('/'))
  let newName = pos === -1 ? name : name.substring(0, pos)
  let newTag = pos === -1 ? undefined : name.substring(pos + 1)
  let image = (cluster.images || []).find(image => image.name === name || image.name === newName)
  if (image) {
    newName = image.newName || newName
    newTag = image.newTag || newTag
  } else {
    if (cluster.registry && !name.includes('/')) newName = cluster.registry + '/' + newName
    newTag = newTag || cluster.imageTag
  }
  return newTag ? newName + ':' + newTag : newName
}
