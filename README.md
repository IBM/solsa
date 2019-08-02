<!--
#
# Copyright 2019 IBM Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
-->

# SolSA

The SolSA library for [Node.js](https://nodejs.org) makes it possible to specify
the architecture of [Kubernetes](https://kubernetes.io) applications as
programs.

With SolSA, developers can configure Kubernetes-managed resources by writing
Javascript or Typescript code instead of YAML, relying on SolSA to translate
their source code to YAML. SolSA integrates with IDEs such as [Visual Studio
Code](https://code.visualstudio.com) to provide online validation, code
completion, and documentation of the various resources and configuration
parameters. SolSA enables the definition of architectural patterns (bundles of
resources) that can be used across many applications.

Thanks to Kubernetes operators, Kubernetes applications can include not only
containerized services but also managed cloud services (using for instance the
[IBM Cloud Operator](https://github.com/IBM/cloud-operators)), cloud functions
(using the [IBM Cloud Functions
operator](https://github.com/IBM/cloud-functions-operator)),
[Knative](https://knative.dev) services and events, etc.

While SolSA is meant to facilitate application development and deployment on the
IBM Cloud and supports a few IBM-specific services out of the box, the SolSA
programming model and code is intended to work with any Kubernetes cluster and
any cloud. No IBM Cloud account required.

SolSA is an open-source project with an [Apache 2.0 license](LICENSE.txt). We
welcome [contributions](CONTRIBUTIONS.md)!

## Motivation and Capabilities

Kubernetes is becoming the de facto standard for managing applications in the cloud
(public, private, multi, hybrid, etc.). While YAML is a fine language to setup a
few things, we believe application developers need to reason about applications
at a higher-level of abstraction using the languages and tools they are familiar
with.

Developers can use SolSA to configure Kubernetes resources using Javascript or
Typescript instead of YAML. But SolSA is not just a syntax. SolSA supports
bundling together resources into reusable abstractions that expose curated
configuration parameters. For instance, SolSA offers a `ContainerizedService`
bundle that combines a `Deployment` and a `Service`, automatically bridging the
two by means of auto-generated labels and selectors.

SolSA bundles can be smart and vary their content based on context. In
particular, SolSA leverages
[Kustomize](https://github.com/kubernetes-sigs/kustomize) to permit targeting
multiple environments, e.g., local development cluster, a Red Hat OpenShift on
IBM Cloud cluster, or an IBM Cloud Kubernetes Service cluster. SolSA
automatically tailors resource bundles such as `Ingress` to the specifics of
each targeted environment.

SolSA can synthesize all the YAML needed to deploy an application. But it does
not have to do so. SolSA supports easy configuration to select which resources
should be unique to an application instance and which resources should be shared
across multiple instances.

SolSA facilitates the configuration of related resouces for instance a Kafka
instance, a Kafka topic, and a Knative Kafka event source, by automatically
reusing relevant configuration information. SolSA can not only inject
configuration information from one resource into another during YAML generation
but also, if necessary, during deployment using the [Composable
operator](https://github.com/IBM/composable). Using this operator, SolSA can for
example configure a Kafka source to dynamically obtain a list of broker urls
from a Kafka instance deployed at the same time.

SolSA generates pure Kubernetes YAML that be deployed at once, i.e., with a
single `kubectl apply` or `oc apply` command. SolSA does not need a server-side
component.

SolSA includes an optional capability to containerize Node.js code. This
facilitates the integration of components that require a little bit of glue code
to interface properly, e.g., to align schemas or match protocols. This glue code
can leverage Node.js frameworks such as [Express](https://expressjs.com) or
[KafkaJS](https://kafka.js.org). SolSA builds and pushes the container image in
addition to synthesizing the YAML to instantiate the image with the proper
configuration.

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

Install SolSA (preferably in your home directory):
```shell
npm install solsa
```
Try the CLI:
```shell
./node_modules/.bin/solsa
```
```
Usage:
  solsa <command> [flags]

Available commands:
  build <solution.js>        build container images
  push <solution.js>         push container images to registries for current kubernetes context
  yaml <solution.js>         synthesize yaml for current kubernetes context

Global flags:
      --cluster <cluster>    use <cluster> instead of current kubernetes cluster
      --config <config>      use <config> file instead of default
  -c, --context <context>    use <context> instead of current kubernetes context

Flags for "yaml" command:
  -o, --output <file>        output base yaml and context overlays to <file>.tgz
```
We recommend adding the `solsa` CLI to your PATH.

### Kubernetes Cluster Setup

We assume that you have already configured `kubectl` or `oc` to be able to
access each Kubernetes cluster you will be using with SolSA.

On each cluster:
1. Install the IBM Cloud Operator from https://github.com/IBM/cloud-operators.

2. Install the Composable Operator from https://github.com/IBM/composable.

3. Install the Event Streams Topic operator from
   https://github.com/IBM/event-streams-topic.

4. Optionally install the Cloud Functions Operator from
   https://github.com/IBM/cloud-functions-operator.

5. Optionally install Knative. For IKS, follow the instructions at
   https://cloud.ibm.com/docs/containers?topic=containers-serverless-apps-knative.

### Additional Setup for OpenShift

1. Many docker images will not run correctly using non-root UIDs. You can
   optionally configure OpenShift to allow images that are build from
   Dockerfiles that do not specifiy USER to run as as the root UID with the
   command `oc adm policy add-scc-to-group anyuid system:authenticated`.

### Local Configuration File

Optionally create a `.solsa.yaml` file in your home directory that describes
each Kubernetes context for which you want SolSA to generate a Kustomize
overlay. Just like `kubectl`, `solsa` supports both cluster-level and
context-level specification. Appended is an example that illustrates some of the
options:
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
The NodePort ingress used in `localdev` specifies fixed port assignments based
on service names. Any additional exposed services not named here will be given
dynamic port numbers. The `mycluster` definition demonstrates how to instruct
SolSA to generate a Kustomize overlay that will rename docker images so that
instead of being pulled from the local registry on the dev machine, the images
will instead be pulled from a specific namespace in the IBM Container Registry.
Rules for specific images can also be specified using Kustomize syntax.

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
solsa yaml helloWorld.js | kubectl apply -f -
```
Always replace `kubectl` with `oc` for an OpenShift cluster.

After a few seconds, we can query the deployed service using command:
```shell
curl $(kubectl get ingress hello-world -o jsonpath={.spec.rules[0].host})
```
To undeploy the solution, use the command:
```shell
solsa yaml helloWorld.js | kubectl delete -f -
```
The yaml synthesized by SolSA for context `mycluster` is provided in
[helloWorld.yaml](samples/helloWorld.yaml). In this yaml, the image name has
been replaced with the fully qualified name and the ingress has been generated
according to the specification of cluster `mycluster` in the configuration file.

## More Examples

The [solsa-examples](https://github.com/IBM/solsa-examples) repository contains
other examples of cloud-native applications, services, and architectural
patterns defined using SolSA.

## Building SolSA-defined Services

In order to build and deploy solutions that include SolSA-defined services, run:
```shell
solsa build mySolution.js
solsa push mySolution.js
solsa yaml mySolution.js | kubectl apply -f -
```
The `build` command builds images for the SolSA-defined services. The `push`
command tags and pushes these images according to the SolSA configuration for
the current Kubernetes context.

## Development

To contribute to the development of SolSA, you will need to clone, build, and
link this repository:
```shell
git clone https://github.com/IBM/solsa/solsa.git
cd solsa
npm install
npm run build
```
Make sure to use the `solsa` CLI from your clone.
