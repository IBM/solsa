// example client for our translation service instance

let client = require('../client')

async function main () {
  console.log(await client.identify({ text: 'bonjour' }))
  console.log(await client.translate({ text: 'bonjour' }))
}

main()
