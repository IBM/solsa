const PORT = 8080

let solsa = {
  watson: {
    LanguageTranslatorV3: class LanguageTranslatorV3 {
      constructor (name) {
        this.name = name
        this.values = {
          url: { secretKeyRef: { name: `binding-${this.name}`, key: 'url' } },
          apikey: { secretKeyRef: { name: `binding-${this.name}`, key: 'apikey' } }
        }
      }

      async identify (payload, url, apikey) {
        // TODO call the watson translator service, faking the result for now
        console.log(`watson.LanguageTranslatorV3.identify ${JSON.stringify(payload)}, ${url}, ${apikey}`)
        return { languages: [{ language: 'fr' }] }
      }

      async translate (payload, url, apikey) {
        // TODO call the watson translator service, faking the result for now
        console.log(`watson.LanguageTranslatorV3.translate ${JSON.stringify(payload)}, ${url}, ${apikey}`)
        return { translation: 'hello' }
      }

      _yaml () {
        return {
          apiVersion: 'cloudservice.seed.ibm.com/v1',
          kind: 'Service',
          metadata: {
            name: this.name,
            spec: {
              service: 'language-translator',
              plan: 'lite',
              servicetype: 'IAM'
            }
          }
        }
      }
    }
  },

  Service: class Service {
    constructor (name) {
      if (name !== undefined) {
        for (let key of Object.getOwnPropertyNames(this.constructor.prototype).filter(name => name !== 'constructor')) {
          this[key] = async function () {
            return { request: `${name}.${key} ${JSON.stringify(arguments[0])}` }
            // TODO post to the endpoint
          }
        }
        this.name = name
      }
    }

    _yaml () {
      let _yaml = Object.keys(this.dep).map(key => this.dep[key]._yaml())
      _yaml.push({
        apiVersion: 'v1',
        kind: 'Pod',
        metadata: {
          name: this.name,
          spec: {
            containers: [{
              name: this.name,
              image: this.name,
              ports: [{ containerPort: PORT }],
              env: Object.keys(this.env).map(key => Object.assign({ name: key }, this.env[key]))
            }]
          }
        }
      })
      // TODO endpoint definition
      return _yaml
    }
  }
}

solsa.Service.serve = function () {
  let service = new this()

  for (let key of Object.keys(service.env)) {
    service.env[key] = process.env[key]
  }

  let express = require('express')
  let app = express()
  app.use(express.json())

  for (let key of Object.getOwnPropertyNames(this.prototype).filter(name => name !== 'constructor')) {
    app.post('/' + key, (request, response) => {
      service[key](request.body).then(r => response.send(r), err => response.send(err))
    })
  }

  app.listen(PORT, err => {
    if (err) {
      console.log(err)
    } else {
      console.log(`server is listening on ${PORT}`)
    }
  })
}

module.exports = solsa
