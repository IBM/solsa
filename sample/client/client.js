// example client for our translation service instance

// the client is derived from the service instance
let client = require('../app').client()

client.identify({ text: 'bonjour' })
client.translate({ text: 'bonjour' })
