// define a new class of translator services by composing watson translator apis

let solsa = require('solsa')

class Echo extends solsa.Service {
  // instantiate the service
  constructor(name, repeats) {
    super(name)

    // dependencies on other services
    this.dep = {
    }

    // parameters of the deployment
    this.env = {
      NUM_REPEATS: { value: repeats }, // desired number of echos
    }
  }

  // repeat payload.txt the configured number of times
  async echo(payload) {
    let text = payload.text
    let echo = new Array()
    let limit = parseInt(this.env.NUM_REPEATS, 10)
    var i;
    for (i=0; i<this.env.NUM_REPEATS; i++) {
      echo.push(text)
    }
    return { "text" : echo }
  }
}

module.exports = Echo
