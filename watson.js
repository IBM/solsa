let _LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3')

let watson = {
  LanguageTranslatorV3: class LanguageTranslatorV3 {
    constructor (name) {
      this.name = name
      this.secrets = {
        url: { valueFrom: { secretKeyRef: { name: `binding-${this.name}`, key: 'url' } } },
        apikey: { valueFrom: { secretKeyRef: { name: `binding-${this.name}`, key: 'apikey' } } }
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
        apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
        kind: 'Service',
        metadata: {
          name: this.name
        },
        spec: {
          service: 'language-translator',
          plan: 'lite',
          servicetype: 'IAM'
        }
      }]
    }
  }
}

module.exports = watson
