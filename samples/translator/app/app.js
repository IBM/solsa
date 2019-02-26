// example client for our translation service instance

let translator = require('./instance')

async function main () {
  console.log(await translator.identify({ text: 'bonjour' }))
  console.log(await translator.translate({ text: 'bonjour' }))
}

main()
