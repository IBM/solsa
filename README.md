# SolSA

The SolSA programming model is intended to ease the _development_, _deployment_,
and _consumption_ of cloud-native services and applications.

SolSA makes it possible to compose existing services (cloud services, cloud
functions, container-based services) into new micro-services and applications. A
SolSA service is defined by means of a Node.js module. From this code, SolSA
builds and publishes the service as a container image, prepares the deployment
of the service and its dependencies as a list of kubernetes resource definitions
(a yaml file), and produces an SDK for invoking the service.

SolSA leverages Kubernetes operators to manage the life cycle of services both
inside and outside of Kubernetes.

The SolSa source code includes declarations for the service being composed over
as well as configuration parameters. SolSA leverages these declarations to
construct a complete yaml description of a service instance, its transitive
dependencies, and the configurations of all the services involved.

Service APIs are defined by means of Javascript function declarations. Service
invocations are just function calls. SolSA relieves the developer from having to
worry about REST APIs, routes, containers, etc.

## Installation

```
git clone https://github.ibm.com/solsa/solsa.git
cd solsa
npm install
(cd samples/translator/service; npm install)
```

## Example

An example translator service is defined in
[translator.js](samples/translator/service/translator.js). This example service
builds upon several APIs of the Watson translation service (language
identification and language translation) to translate a text from an unknown
language to a desired language.
```javascript
class Translator extends solsa.Service {
  // instantiate the service
  constructor (name, language) {
    super(name)

    // dependencies on other services
    this.dep = {
      wTranslator: new solsa.watson.LanguageTranslatorV3(`watson-translator-for-${name}`)
    }

    // parameters of the deployment
    this.env = {
      TARGET_LANGUAGE: { value: language }, // desired target language
      WATSON_URL: { valueFrom: this.dep.wTranslator.values.url },
      WATSON_APIKEY: { valueFrom: this.dep.wTranslator.values.apikey }
    }
  }

  // return the most probable language of { text } as { language }
  async identify (payload) {
    let text = payload.text
    let result = await this.dep.wTranslator.identify({ text }, this.env.WATSON_URL, this.env.WATSON_APIKEY)
    return { language: result.languages[0].language } // watson returns an array of probably languages
  }

  // translate { text } to target language
  async translate (payload) {
    let text = payload.text
    try {
      let result = await this.identify({ text }) // call api of this service
      let source = result.language
      let target = this.env.TARGET_LANGUAGE // parameter of the deployment
      let translation
      if (source !== target) {
        let result = await this.dep.wTranslator.translate({ source, target, text }, this.env.WATSON_URL, this.env.WATSON_APIKEY)
        translation = result.translation
      } else {
        translation = text // no translation needed
      }
      return { text: translation }
    } catch (error) {
      console.log(this.dep.wTranslator)
      return { text: 'Sorry, we cannot translate your text' }
    }
  }
}
```
The new service is defined as a class extending `solsa.Service`. The field names
`dep` and `env` are reserved to respectively specify dependencies on other
services and deployment-time parameters. The new service declares Watson
translator as a dependency. It specifies the desired target language for the
translation as a deployment parameter (as opposed to, say, a parameter specified
in each request).  It provides two APIs defined by means of asynchronous
Javascript functions: `idenfity` and `translate`.

The `WATSON_URL` and `WATSON_APIKEY` parameters are obtained from the Watson
translator deployment itself (via kubernetes secrets).

In general, SolSA makes API definitions and invocations look like function
declarations and function calls of the host language. SolSA automatically
translates the function calls of the client SDK into http requests and
automatically generates an http server to implement a service, automatically
mapping the incoming requests to the Javascript functions.

Moreover, error results from service invocations are turned into Javascript
exceptions so as to permit using Javascript try-catch contruct to handle errors
in the usual way.

### Run the service locally

We can run this service using command:
```
TARGET_LANGUAGE="en" \
WASTON_URL="https://gateway.watsonplatform.net/language-translator/api" \
WATSON_APIKEY="..." \
bin/solsa-serve samples/translator/service &
```
When running locally, deployment-time parameters are provided by means of environment variables.

Try:
```
curl -H "Content-Type: application/json" localhost:8080/translate -d '{"text":"bonjour"}'
```
```
{"text":"Hello"}
```

### Containerize the service

Assume the docker registry to be used is specified in environment variable
`REGISTRY`.

We build a container for the service using command:
```
bin/solsa-build samples/translator/service -t $REGISTRY/solsa-translator
```
Try:
```
docker run -p 8080:8080 -e TARGET_LANGUAGE="en" -e WASTON_URL="..." -e WATSON_APIKEY="..." -d "$REGISTRY"/solsa-translator

curl -H "Content-Type: application/json" localhost:8080/translate -d '{"text":"bonjour"}'
```
```
{"text":"Hello"}
```

### Push the service image

Acquire a read/write token `CR_RW_TOKEN` and a read token `CR_R_TOKEN` for the
container registry.

Log in to the container registry.
```
echo "$CR_RW_TOKEN" | docker login -u token --password-stdin "$REGISTRY"
```
Install the IBM Container Registry token as a secret in the target Kubernetes
cluster by executing the command:
````
kubectl create secret docker-registry solsa-image-pull --docker-server="$REGISTRY" --docker-username=token --docker-email="$EMAIL" --docker-password="$CR_R_TOKEN"
````
Push the translator service image to the registry as follows:
```
docker push "$REGISTRY"/solsa-translator
```

### Deploy a service instance

To deploy a service on Kubernetes we first need to define a service instance as
demoed in [instance.js](samples/translator/app/instance.js):
```javascript
let Translator = require('../service')

module.exports = new Translator('my-translator', 'en')
```
We specify the desired name for the service instance (i.e. the name of the
kubernetes resource representing this service instance) and the desired target
language.

SolSA can generate the yaml for deploying the service instance and its
dependencies using the command:
```
bin/solsa-yaml samples/translator/app/instance.js | tee translator.yaml
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
      - name: WATSON_URL
        valueFrom:
          secretKeyRef:
            name: binding-watson-translator-for-my-translator
            key: url
      - name: WATSON_APIKEY
        valueFrom:
          secretKeyRef:
            name: binding-watson-translator-for-my-translator
            key: apikey
```
As expected the desired target language is burned into this configuration.

Assuming the previously build container is pushed to the container registry, the
above yaml can be applied using `kubectl`:
```
kubectl apply -f translator.yaml
```

### Client SDK and applications

We can use the deployed instance to build an application as demoed in
[app.js](samples/translator/app/app.js):
```javascript
let translator = require('./instance')

async function main () {
  console.log(await translator.identify({ text: 'bonjour' }))
  console.log(await translator.translate({ text: 'bonjour' }))
}

main()
```
The same [instance.js](samples/translator/app/instance.js) code that was used
earlier to define the service instance to be deployed is now used to specify the
service instance to connect to, eliminating any risk of error.

Try:
```
node samples/translator/app/app.js
```
```
{ request: 'my-translator.identify {"text":"bonjour"}' }
{ request: 'my-translator.translate {"text":"bonjour"}' }
```
_For now, the client SDK simply logs the requests being made without connecting
to the actual service instance. The request implementation will be added
shortly._


