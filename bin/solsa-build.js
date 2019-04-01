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
  default: { config: process.env.SOLSA_CONFIG || path.join(os.homedir(), '.solsa.yaml'), tag: 'latest' },
  alias: { config: 'c', tag: 't' },
  string: ['config', 'push', 'tag']
})

if (argv._.length !== 1) {
  console.error('Usage:')
  console.error('  solsa-build path [flags]')
  console.error('Flags:')
  console.error('  -c, --config CONFIG  parse CONFIG file')
  console.error('  --push CLUSTER       push images to CLUSTER')
  console.error('  -t, --tag TAG        use TAG instead of "latest"')
  process.exit(1)
}

function build (name, cwd, tags = [], push) {
  console.log(`Building image "${name}" with tags ${tags.map(tag => `"${tag}"`).join(', ')}`)
  if (!fs.existsSync(path.join(cwd, 'package.json'))) {
    console.error(`Missing package.json in ${cwd}`)
    process.exit(1)
  }

  if (!fs.existsSync(path.join(cwd, 'package.json'))) {
    console.log('Running npm install')
    cp.execSync('npm install --prod --no-save', { cwd, stdio: [0, 1, 2] })
  }

  console.log('Copying files to temporary folder')
  const dir = tmp.dirSync({ mode: '0755', prefix: 'solsa_', unsafeCleanup: true })
  cp.execSync(`rsync -rL --exclude=.git . "${dir.name}"`, { cwd, stdio: [0, 1, 2] })

  console.log('Running docker build')
  cp.execSync(`docker build -f node_modules/solsa/Dockerfile "${dir.name}" ${tags.map(tag => `-t "${tag}"`).join(' ')}`, { cwd, stdio: [0, 1, 2] })

  console.log('Reclaiming temporary folder')
  dir.removeCallback()

  if (push) {
    console.log(`Running docker push "${push}"`)
    cp.execSync(`docker push "${push}"`, { stdio: [0, 1, 2] })
  }

  console.log()
}

global.__yaml = true

const config = fs.existsSync(argv.config) ? yaml.safeLoad(fs.readFileSync(argv.config, 'utf8')) : { clusters: [] }

if (argv.push && !config.clusters.find(cluster => cluster.name === argv.push)) {
  console.error(`Cannot find cluster "${argv.push}" in configuration file`)
  process.exit(1)
}

const apps = require(path.resolve(argv._[0]))
for (let idx in apps) {
  const app = apps[idx]
  const images = app._images()
  for (let image of Object.values(images)) {
    const tags = [`${image.name}:${argv.tag}`]
    let push
    for (let cluster of config.clusters) {
      const match = cluster.images && cluster.images.find(x => x.name === image.name)
      let tag
      if (match) {
        tag = `${match.newName || image.name}:${match.newTag || argv.tag}`
      } else if (cluster.registry) {
        tag = `${cluster.registry}/${image.name}:${argv.tag}`
      }
      if (tag) {
        tags.push(tag)
        if (cluster.name === argv.push) push = tag
      }
    }
    build(image.name, image.dir, tags, push)
  }
}
