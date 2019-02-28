// example client for our translation service instance

let echo = require('./instance')

async function main () {
  console.log(await echo.echo({ text: 'bonjour' }))
  console.log(await echo.echo({ text: 'bonjour' }))
}

main()
