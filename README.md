# SolSA

The SolSA library for Node.js makes it possible to specify the architecture of
cloud-native solutions as programs. Using SolSA, a developer can enumerate and
configure all the components of a solution including resources such as managed
cloud services, cloud functions, containerized services, Knative services and
event sources.

SolSA leverages Kubernetes operators to define and configure these resources
whether they run inside or outside of a Kubernetes cluster. SolSA relies on the
[composable operator](https://github.ibm.com/seed/composable) to encode dynamic
dependencies between resource configurations.

SolSA can synthesize all the yaml needed to deploy a solution. But it
does not have to do so. SolSA supports easy configuration to select
which resources should be unique to a solution instance and which
resources should be shared across multiple instances.  The generated
yaml can be deployed at once, i.e., with a single `kubectl apply`
or `oc apply` command.  Optionally, SolSA leverages
[Kustomize](https://github.com/kubernetes-sigs/kustomize) to permit
targeting multiple environments, e.g., local development cluster, a Red Hat OpenShift on IBM Cloud cluster,
or an IBM Cloud Kubernetes Service cluster.
SolSA automatically tailors resources such as
ingresses to the specifics of each targeted environment.

The SolSA code is much more compact and much less error-prone than the yaml it
produces. SolSA enables the specification of repeatable architectural patterns
that can be reused across many solutions. SolSA simplifies the configuration of
related resources such as a Kafka instance, a Kafka topic, and a Knative Kafka
event source. 

SolSA includes an optional capability to containerize Node.js code. This
facilitates the integration of components that require a little bit of glue code
to interface properly, e.g., to align schemas or match protocols. This glue code
can leverage portable Node.js frameworks such as
[Express](https://expressjs.com) or [KafkaJS](https://kafka.js.org). SolSA
builds and pushes the container image in addition to synthesizing the yaml to
instantiate the image with the proper configuration.

## Components

SolSA consists of:
- A main `solsa` Node.js module that provides a library of high-level
  abstractions for defining the software architecture of a solution.
- A `solsa` command-line interface (CLI):
  - `solsa build` builds container images for SolSA-defined services (if any).
  - `solsa push` pushes container images for SolSA-defined services (if any).
  - `solsa yaml` synthesizes yaml for deploying SolSA solutions on Kubernetes.

SolSA supports Node.js 8 and above.

## Setup

Install SolSA:
```shell
npm -g install git+ssh://git@github.ibm.com:solsa/solsa.git#prebuilt
```

### Kubernetes Cluster Setup

We assume that you have already configured `kubectl` or `oc` to be able to access each
Kubernetes cluster you will be using with SolSA.

Note: If you are installing SolSA on an IKS cluster, we assume your cluster is
already properly configured to enable you to pull images from the IBM Container
Registry. If it is not, please see the instructions at
https://cloud.ibm.com/docs/containers?topic=containers-images.

On each cluster:
1. Install the IBM Cloud Operator from https://github.com/ibm/cloud-operators.

2. Install the Composable Operator from https://github.com/ibm/composable.

3. Install the Event Streams Topic operator from https://github.ibm.com/seed/event-streams-topic.

4. Optionally install Knative. For IKS, follow the instructions at
   https://cloud.ibm.com/docs/containers?topic=containers-serverless-apps-knative.

### Additional Setup for OpenShift

1. Many docker images will not run correctly using non-root UIDs.
   You can optionally configure OpenShift to allow images that
   are build from Dockerfiles that do not specifiy USER 
   to run as as the root UID with the command
   `oc adm policy add-scc-to-group anyuid system:authenticated`.
   

### Local Configuration File

Optionally create a `.solsa.yaml` file in your home directory that describes
each Kubernetes context for which you want SolSA to generate a Kustomize
overlay. Just like `kubectl`, `solsa` supports both cluster-level and context-level
specification.
Appended is an example that illustrates some of the options:
```yaml
clusters:
- name: 'docker-for-desktop-cluster'
  ingress:
    nodePort: true
- name: 'mycluster'
  ingress:
    iks:
      subdomain: 'mycluster123.us-east.containers.appdomain.cloud'
      tlssecret: 'mycluster123'
  registry: 'us.icr.io/tardieu'
  images:
  - name: 'kn-helloworld'
    newName: 'docker.io/ibmcom/kn-helloworld'
- name: 'myrhoscluster'
  ingress:
    os:
      subdomain: 'myrhoscluster456.us-east.containers.appdomain.cloud'
contexts:
- name: localdev
  cluster: 'docker-for-desktop-cluster'
  defaultTag: dev
  ingress:
    nodePort:
    - name: my-library-productpage
      port: 32123
    - name: my-library-ratings
      port: 32124
```
The NodePort ingress used in `localdev` specifies fixed port assignments based on service names.
Any additional exposed services not named here will be given dynamic port numbers.
The `mycluster` definition demonstrates how to instruct SolSA to generate a
Kustomize overlay that will rename docker images so that instead of being pulled
from the local registry on the dev machine, the images will instead be pulled
from a specific namespace in the IBM Container Registry. Rules for specific
images can also be specified using Kustomize syntax.

## A First Example

A sample SolSA solution is provided in [helloWorld.js](samples/helloWorld.js).
```javascript
const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.helloWorld = new solsa.ContainerizedService({ name: 'hello-world', image: 'kn-helloworld', port: 8080 })
bundle.ingress = new bundle.helloWorld.Ingress()
```
It consists of a single containerized service and an ingress for this service.

This solution can be deployed to the current Kubernetes context using the
`solsa` CLI and either `kubectl` or `oc` as follows.
```shell
solsa yaml helloWorld.js | [kubectl|oc] apply -f -
```

To undeploy the solution, use the command:
```shell
solsa yaml helloWorld.js | [kubectl|oc] delete -f -
```
The yaml synthesized by SolSA for context `mycluster` is provided in
[helloWorld.yaml](samples/helloWorld.yaml). In this yaml, the image name has
been replaced with the fully qualified name and the ingress has been generated
according to the specification of cluster `mycluster` in the configuration file.

## More Examples

The [solsa-examples](https://github.ibm.com/solsa/solsa-examples) repository
contains other examples of cloud-native applications, services, and
architectural patterns defined using SolSA.

## Building SolSA-defined Services

In order to build and deploy solutions that include SolSA-defined services, run:
```shell
solsa build mySolution.js
solsa push mySolution.js
solsa yaml mySolution.js | [kubectl|oc] apply -f -
```
The `build` command builds images for the SolSA-defined services. The `push`
command tags and pushes these images according to the SolSA configuration for
the current Kubernetes context.

## Development

To contribute to the development of SolSA, you will to clone, build, and link this repository:
```shell
git clone https://github.ibm.com/solsa/solsa.git
cd solsa
npm install
npm run build
npm link
```
This will ensure the `solsa` CLI uses the local checkout.
