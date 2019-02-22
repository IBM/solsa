let yaml = require('js-yaml')

let port = 8080

let cedar = {
  watson: {
    LanguageTranslatorV3 (name) {
      let credentials = {} // TODO handle distinct credentials for multiple instances of the service?
      credentials.url = { name: 'WATSON_TRANSLATOR_URL', valueFrom: { secretKeyRef: { name: `binding-${name}`, key: 'url' } } }
      credentials.key = { name: 'WATSON_TRANSLATOR_APIKEY', valueFrom: { secretKeyRef: { name: `binding-${name}`, key: 'apikey' } } }
      return {
        name,
        credentials,
        client: () => ({
          async identify (payload) {
            // TODO call the watson translator service, faking the result for now
            console.log(`watson.LanguageTranslatorV3.identify ${JSON.stringify(payload)}`)
            return { languages: [{ language: 'fr' }] }
          },
          async translate (payload) {
            // TODO call the watson translator service, faking the result for now
            console.log(`watson.LanguageTranslatorV3.translate ${JSON.stringify(payload)}`)
            return { translation: 'hello' }
          }
        }),
        _yaml () {
          return {
            apiVersion: 'cloudservice.seed.ibm.com/v1',
            kind: 'Service',
            metadata: {
              name,
              spec: {
                service: 'language-translator',
                plan: 'lite',
                servicetype: 'IAM'
              }
            }
          }
        }
      }
    }
  }
}

function pod (kind, name, dependencies, parameters) {
  let _yaml = Object.keys(dependencies).map(key => dependencies[key]._yaml())
  _yaml.push({
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: {
      name,
      spec: {
        containers: [{
          name,
          image: name,
          ports: [{ containerPort: port }],
          env: Object.keys(parameters).map(key => parameters[key])
        }]
      }
    }
  })
  // TODO endpoint definition
  return _yaml
}

cedar.service = def => ({
  new (name) {
    let instance = { dependencies: def._dependencies, parameters: def._parameters }
    instance.dependencies = instance.dependencies(name)
    instance.parameters = instance.parameters(...arguments)
    instance.credentials = {} // TODO
    instance._yaml = () => pod(def._kind, name, instance.dependencies, instance.parameters)
    instance.client = () => {
      let client = {}
      for (let key of Object.keys(def).filter(name => name[0] !== '_')) {
        client[key] = async payload => {
          console.log(`request: ${name}.${key} ${JSON.stringify(payload)}`)
          return {} // TODO post to the endpoint
        }
      }
      return client
    }
    instance.yaml = () => instance._yaml().map(obj => yaml.safeDump(obj, { noArrayIndent: true })).join('---\n')
    return instance
  },

  serve () {
    let obj = { dependencies: def._dependencies, parameters: def._parameters }
    obj.dependencies = obj.dependencies()
    obj.parameters = obj.parameters()
    for (let p of Object.keys(obj.parameters)) {
      obj.parameters[p] = process.env[obj.parameters[p].name]
    }
    let keys = Object.keys(def).filter(name => name[0] !== '_')
    for (let key of keys) {
      obj[key] = def[key]
    }
    server(obj, keys)
  }
})

function server (obj, keys) {
  let express = require('express')
  let app = express()
  app.use(express.json())

  for (let key of keys) {
    app.post('/' + key, (request, response) => {
      obj[key](request.body).then(r => response.send(r), err => response.send(err))
    })
  }

  app.listen(port, err => {
    if (err) {
      console.log(err)
    } else {
      console.log(`server is listening on ${port}`)
    }
  })
}

module.exports = cedar
