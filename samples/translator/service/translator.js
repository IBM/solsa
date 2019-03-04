// define a new class of translator services by composing watson translator apis

let solsa = require('solsa')
let watson = require('solsa/watson')

class Translator extends solsa.Service {
  // instantiate the service
  constructor (name, language) {
    super(name)

    // dependencies on other services
    this.dep = {
      wTranslator: new watson.LanguageTranslatorV3(`watson-translator-for-${name}`)
    }

    // parameters of the deployment
    this.env = {
      TARGET_LANGUAGE: { value: language }, // desired target language
      WATSON_URL: this.dep.wTranslator.secrets.url,
      WATSON_APIKEY: this.dep.wTranslator.secrets.apikey
    }
  }

  // return the most probable language of { text } as { language }
  async identify (payload) {
    let text = payload.text
    let result = await this.dep.wTranslator.identify({ text }, this.env.WATSON_URL, this.env.WATSON_APIKEY)
    return { language: result.languages[0].language } // watson returns an array of probably languages
  }

  // translate { text } to target language
  async translate (payload) {
    let text = payload.text
    try {
      let result = await this.identify({ text }) // call api of this service
      let source = result.language
      let target = this.env.TARGET_LANGUAGE // parameter of the deployment
      let translation
      if (source !== target) {
        let result = await this.dep.wTranslator.translate({ source, target, text }, this.env.WATSON_URL, this.env.WATSON_APIKEY)
        translation = result.translations[0].translation
      } else {
        translation = text // no translation needed
      }
      return { text: translation }
    } catch (error) {
      console.log(this.dep.wTranslator)
      return { text: 'Sorry, we cannot translate your text' }
    }
  }
}

module.exports = Translator
