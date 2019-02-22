# SolSA

The SolSA programming model is intended to ease the development and deployment
of cloud-native applications. It makes it possible to compose existing services
(cloud services, cloud functions, container-based services) into new services
and applications. In particular, any REST service can be composed over.

A SolSA service is defined by means of a Javascript module. From this code,
SolSA builds and publishes the service as a container image, prepares the
deployment of the service and its dependencies as a list of kubernetes resource
definitions (a yaml file), and produces an SDK for invoking the service.

SolSA leverages kubernetes operators to manage services both inside and outside
of kubernetes.

The Javascript code for a service definition includes declarations for the
service being composed over as well as configuration parameters for a service
instance. SolSA leverages these declarations to construct a complete yaml
description of a service instance, its (transitive) dependencies, and the
configurations of all the services involved.

Service APIs are defined by means of Javascript function declarations.
Service invocations are just function calls. SolSA relieves the developer
from having to worry about communication protocols.

## Example

An example translator service is defined in
[translator.js](sample/translator/translator.js). This example service builds
upon several APIs of the Watson translation service (language identification and
language translation) to translate a text from an unknown language to a desired
language.
```javascript
module.exports = solsa.service({
  // the required services
  _dependencies (name) { /* ... */ },

  // the parameters of a service instance
  _parameters (name, language) { /* ... */ },

  // return the most probable language of { text } as { language }
  async identify (payload) { /* ... */ },

  // translate { text } to target language
  async translate (payload) { /* ... */ }
})
```
The new service definition declare Watson translator as a dependency. It
specifies the desired target language for the translation as a service instance
parameter (as opposed to, say, a parameter specified in each request). It
provides two APIs defined by means of Javascript functions.

In general, SolSA makes API definitions and invocations look like function
declarations and function calls of the host language. SolSA automatically
translates the function calls of the client SDK into http requests and
automatically generates an http server to implement a service, automatically
mapping the incoming requests to the Javascript functions.

Moreover, error results from service invocations are turned into Javascript
exceptions so as to permit using Javascript try-catch contruct to handle
errors in the usual way.

Instantiating a SolSA service is very easy as demoed in
[app.js](sample/app/app.js):
```javascript
module.exports = require('../translator').new('my-translator', 'en')
```
We specify the desired name for the service instance (i.e. the name of the
kubernetes resources managing this service instance) and the desired target
language.

A client for the service instance is constructed as demoed in
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
_For now, the client simply logs the requests being made without connecting to
the actual service. The request implementation will be added shortly._

A server implementing the translator service is obtained as follows:
```
TARGET_LANGUAGE='en' bin/solsa-serve sample/translator &
```
Try:
```
curl -H "Content-Type: application/json" localhost:8080/translate -d '{"text":"bonjour"}'
```
In the future, we intend to automatically package and publish this server as
container image.

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
