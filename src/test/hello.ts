import * as solsa from '..'

module.exports = new solsa.ContainerizedService({ name: 'hello-world', image: 'docker.io/ibmcom/kn-helloworld', port: 8080 })
