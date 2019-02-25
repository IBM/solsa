// example client for our translation service instance

// define an instance of the translator service
let client = require('../translator').new('my-translator', 'en')

client.identify({ text: 'bonjour' })
client.translate({ text: 'bonjour' })
