# SolSA

The SolSA programming model is intended to ease the development and deployment
of micro-services. It makes it possible to develop new micro-services and
applications by composing existing micro-services.

SolSA permits the declaration of service dependencies. SolSA leverages these
dependencies to construct complete yaml descriptions of the developed service,
its (transitive) dependencies and the configurations of all the services.

An example translator service is defined in
[translator.js](sample/translator/translator.js). This example service builds
upon several APIs of the Watson translation service to translate a text from an
unknown language to a desired language.
```javascript
module.exports = solsa.service({
  // the required services
  _dependencies (name) { /* ... */ },

  // the parameters of the deployment
  _parameters (name, language) { /* ... */ },

  // return the most probable language of { text } as { language }
  async identify (payload) { /* ... */ },

  // translate { text } to target language
  async translate (payload) { /* ... */ }
})
```
The new service definition includes a precise specification of upstream service
dependencies, deployment configuration, in addition to the code for the apis
provided by the service. For instance, the target language is specified as a
deployment-time parameter for the service instance.

Instantiating a SolSA service is very easy as demoed in
[app.js](sample/app/app.js):
```javascript
module.exports = require('../translator').new('my-translator', 'en')
```
We specify the service name (kubernetes name) and the desired target language.

A client for the service is constructed as demoed in
[client.js](sample/client/client.js):
```javascript
let client = require('../app').client()

client.identify({ text: 'bonjour' })
client.translate({ text: 'bonjour' })
```
Try:
```
node sample/client/client.js
```
In general, SolSA makes api definitions and service invocations look like function declarations and function calls of the host language. SolSA automatically translate
the function calls in the client into REST API calls and automatically generates a
REST API server to implement a service, automatically mapping the incoming requests
to the API implementations.

A server implementing the translator service is obtained as follows:
```
bin/solsa-serve sample/translator &
```
Try:
```
curl -H "Content-Type: application/json" localhost:8080/translate -d '{"text":"bonjour"}'
```
In the future, we intend to automatically package this server as container
image.

SolSA already supports generating the yaml for deploying the service instance
and its dependencies:
```
bin/solsa-yaml sample/app
```
```yaml
apiVersion: cloudservice.seed.ibm.com/v1
kind: Service
metadata:
  name: watson-translator-for-my-translator
  spec:
    service: language-translator
    plan: lite
    servicetype: IAM
---
apiVersion: v1
kind: Pod
metadata:
  name: my-translator
  spec:
    containers:
    - name: my-translator
      image: my-translator
      ports:
      - containerPort: 8080
      env:
      - name: TARGET_LANGUAGE
        value: en
      - name: WATSON_TRANSLATOR_URL
        valueFrom:
          secretKeyRef:
            name: binding-watson-translator-for-my-translator
            key: url
      - name: WATSON_TRANSLATOR_APIKEY
        valueFrom:
          secretKeyRef:
            name: binding-watson-translator-for-my-translator
            key: apikey
```
