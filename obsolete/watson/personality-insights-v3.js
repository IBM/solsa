// Autogenerated. DO NOT MODIFY

const solsa = require('../solsa')
const _PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3-generated')

class PersonalityInsightsV3 extends solsa.Service {
  constructor (name) {
    super(name, true)

    this.url = this.addSecret(`binding-${name}`, 'url')
    this.apikey = this.addSecret(`binding-${name}`, 'apikey')
  }
  async profile (params) {
    return new Promise((resolve, reject) => {
      if (this.delegate === undefined) {
        this.delegate = new _PersonalityInsightsV3({ version: '2018-05-01', iam_apikey: this.apikey, url: this.url })
      }
      this.delegate.profile(params, (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
    })
  }

  _yaml (archive) {
    const svc = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Service',
      metadata: {
        name: this.name
      },
      spec: {
        service: 'personality-insights',
        plan: 'lite',
        servicetype: 'IAM'
      }
    }
    archive.addResource(svc, this.name + '-svc.yaml')
    const binding = {
      apiVersion: 'ibmcloud.seed.ibm.com/v1beta1',
      kind: 'Binding',
      metadata: {
        name: `binding-${this.name}`
      },
      spec: {
        bindingFrom: {
          name: this.name
        },
        servicetype: 'IAM'
      }
    }
    archive.addResource(binding, this.name + '-binding.yaml')
  }
}

module.exports = PersonalityInsightsV3