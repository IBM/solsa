let _LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3')

let watson = {
  LanguageTranslatorV3: class LanguageTranslatorV3 {
    constructor (name) {
      this.name = name
      this.values = {
        url: { secretKeyRef: { name: `binding-${this.name}`, key: 'url' } },
        apikey: { secretKeyRef: { name: `binding-${this.name}`, key: 'apikey' } }
      }

      for (let f of ['identify', 'translate']) {
        this[f] = async function (payload, url, apikey) {
          if (this.translator === undefined) this.translator = new _LanguageTranslatorV3({ version: '2018-05-01', iam_apikey: apikey, url })
          return new Promise((resolve, reject) => this.translator[f](
            payload, (err, res) => {
              if (err) {
                return reject(err)
              }
              return resolve(res)
            }))
        }
      }
    }

    _yaml (target) {
      return [{
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
      }]
    }
  }
}

module.exports = watson
