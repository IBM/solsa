import * as solsa from '..'
let resource = new solsa.Resource({ name: 'test', object: { apiVersion: 'v1', kind: 'ThisKind' } })
export = resource

resource.solsa.patches = {
  kind: 'ThatKind',
  spec: {
    random: 'data'
  }
}
