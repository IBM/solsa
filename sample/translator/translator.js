// define a new class of translator services by composing watson translator apis

let solsa = require('solsa')

module.exports = solsa.service({
  // instantiation time APIs (names start with underscore)

  // the required services
  _dependencies (name) {
    return {
      wTranslator: solsa.watson.LanguageTranslatorV3(`watson-translator-for-${name}`)
    }
  },

  // the parameters of a service instance
  _parameters (name, language) {
    return Object.assign(
      { target: { name: 'TARGET_LANGUAGE', value: language } }, // desired target language
      this.dependencies.wTranslator.credentials) // watson translation service credentials
  },

  // invocation time APIs

  // return the most probable language of { text } as { language }
  async identify (payload) {
    let text = payload.text
    let result = await this.dependencies.wTranslator.identify({ text }) // call watson api
    return { language: result.languages[0].language } // watson returns an array of probably languages
  },

  // translate { text } to target language
  async translate (payload) {
    let text = payload.text
    try {
      let result = await this.identify({ text }) // call api of this service
      let source = result.language
      let target = this.parameters.target // parameter of the deployment
      let translation
      if (source !== target) {
        let result = await this.dependencies.wTranslator.translate({ source, target, text })
        translation = result.translation
      } else {
        translation = text // no translation needed
      }
      return { text: translation }
    } catch (error) {
      console.log(this.dependencies.wTranslator)
      return { text: 'Sorry, we cannot translate your text' }
    }
  }
})
