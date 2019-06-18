const solsa = require('solsa')
module.exports = new solsa.Resource({ name: 'test', object: { apiVersion: 'v1', kind: 'ThisKind' } })
