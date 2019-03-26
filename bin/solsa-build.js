#!/usr/bin/env node

const minimist = require('minimist')
const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const tmp = require('tmp')

tmp.setGracefulCleanup()

const argv = minimist(process.argv.slice(2), {
  alias: { tag: 't' },
  boolean: 'push',
  string: ['tag', 't']
})

if (argv._.length !== 1) {
  console.error('Usage:')
  console.error('  solsa-build path [flags]')
  console.error('Flags:')
  console.error('  -t, --tag TAG        add TAG tag')
  console.error('  --push               push image to registry')
  process.exit(1)
}

const cwd = argv._[0]

if (!fs.existsSync(path.join(cwd, 'package.json'))) {
  console.error(`Missing package.json in ${cwd}`)
  process.exit(1)
}

if (!fs.existsSync(path.join(cwd, 'package.json'))) {
  cp.execSync('npm install --prod --no-save', { cwd, stdio: [0, 1, 2] })
}

const tags = argv.tag ? Array.isArray(argv.tag) ? argv.tag : [argv.tag] : []

const dir = tmp.dirSync({ mode: '0755', prefix: 'solsa_', unsafeCleanup: true })
cp.execSync(`rsync -rL --exclude=.git . ${dir.name}`, { cwd, stdio: [0, 1, 2] })
cp.execSync(`docker build -f node_modules/solsa/Dockerfile ${dir.name} ${tags.map(tag => `-t "${tag}"`).join(' ')}`, { cwd, stdio: [0, 1, 2] })

if (argv.push) {
  for (let tag of tags) {
    cp.execSync(`docker push ${tag}`, { stdio: [0, 1, 2] })
  }
}
