const solsa = require('solsa')
module.exports = new solsa.Resource({ name: 'test', object: { apiVersion: 'v1', kind: 'ThisKind' } })

module.exports.solsa.patches = {
  kind: 'ThatKind',
  spec: {
    random: 'data'
  }
}
