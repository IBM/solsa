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

SolSA enables developers to configure Kubernetes-managed resources by writing
JavaScript or TypeScript code instead of YAML. SolSA automatically translates
the developer written code to the required lower-level YAML. SolSA integrates
with IDEs such as [Visual Studio Code](https://code.visualstudio.com) to provide
online validation, code completion, and documentation of the various resources
and configuration parameters. SolSA enables the definition of architectural
patterns (bundles of resources) that can be used across many applications.

Thanks to Kubernetes operators, Kubernetes applications can include not only
containerized services but also managed cloud services (using for instance the
[IBM Cloud Operator](https://github.com/IBM/cloud-operators)), cloud functions
(using the [IBM Cloud Functions
Operator](https://github.com/IBM/cloud-functions-operator)),
[Knative](https://knative.dev) services and events, etc.

While SolSA is meant to facilitate application development and deployment on the
IBM Cloud and supports a few IBM-specific services out of the box, the SolSA
programming model and library implementation is intended to work with any
Kubernetes cluster and any cloud. No IBM Cloud account required.

SolSA is an open-source project with an [Apache 2.0
license](https://github.com/IBM/solsa/blob/master/LICENSE.txt). We welcome
[contributions](https://github.com/IBM/solsa/blob/master/CONTRIBUTING.md)!

## Motivation and Capabilities

Kubernetes is becoming the de facto standard for managing applications in the
cloud. While YAML is a fine language to perform some basic configuration, we
believe application developers need to reason about applications at a
higher-level of abstraction using the languages and tools they are familiar
with.

Developers can use SolSA to configure Kubernetes resources using JavaScript or
TypeScript instead of YAML. But SolSA is not just a syntax. SolSA supports
bundling together resources into reusable abstractions that expose curated
configuration parameters. For instance, SolSA offers a `ContainerizedService`
bundle that combines a `Deployment` and a `Service`, automatically bridging the
two by means of auto-generated labels and selectors.

SolSA bundles can be smart and vary their content based on context. In
particular, SolSA leverages
[Kustomize](https://github.com/kubernetes-sigs/kustomize) to permit targeting
multiple environments, e.g., a local development cluster, a Red Hat OpenShift on
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
Operator](https://github.com/IBM/composable). Using this operator, SolSA can for
example configure a Kafka source to dynamically obtain a list of broker urls
from a Kafka instance deployed at the same time.

SolSA generates pure Kubernetes YAML that can be deployed at once, i.e., with a
single `kubectl apply` command. SolSA does not need a server-side
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
- A `solsa` Node.js module that makes it possible to configure using JavaScript
  or TypeScript:
  - all the standard Kubernetes resources,
  - custom resources supported by a growing set of operators,
  - resource bundles that provide high-level abstractions of key architectural
    patterns.
- A `solsa` command-line interface (CLI):
  - `solsa build` builds container images for SolSA-defined services (if any).
  - `solsa push` pushes container images for SolSA-defined services (if any).
  - `solsa yaml` synthesizes YAML for deploying SolSA solutions on Kubernetes.

SolSA supports Node.js 8 and above, Kubernetes 1.14 and above.

## SolSA Setup

### Option 1: Global Install

The easiest way to use SolSA is to install it _globally_. Run the following
command:
```shell
cd $HOME
npm install -g solsa
```
This will add the SolSA CLI to your PATH. This will also download `kustomize` on
supported platforms (`darwin x86_64` and `linux x86_64`). On other platforms,
please install `kustomize` per Kustomize's [install
instructions](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/INSTALL.md)
and adjust your PATH to include it.

Try the CLI:
```shell
solsa
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
  -d, --debug                output a stack trace on error

Flags for "yaml" command:
  -o, --output <file>        output base yaml and context overlays to <file>.tgz
```
While a global install is enough to use the SolSA CLI, we recommend you also
link SolSA from your home directory:
```shell
cd
npm link solsa
```
This will ensure that IDEs such as Visual Studio Code can locate the SolSA
module and provide an optimal developer experience with code completion and
hover help.

### Option 2: Local Install

Install SolSA _locally_ for use in a single project.
```shell
npm install solsa
```
This will install SolSA as a dependency to your current project
(`package.json`). This will also download `kustomize` on supported platforms
(`darwin x86_64` and `linux x86_64`). On other platforms, please install
`kustomize` per Kustomize's [install
instructions](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/INSTALL.md)
and adjust your PATH to include it.

Typically, a local install does not add the SolSA CLI to the PATH. To run the
CLI use:
```shell
$(npm bin)/solsa
```
```
Usage:
  solsa <command> <solution> [flags]

Available commands:
  build <solution>           build container images
  push <solution>            push container images to registries for current kubernetes context
  yaml <solution>            synthesize yaml for current kubernetes context

Global flags:
      --cluster <cluster>    use <cluster> instead of current kubernetes cluster
      --config <config>      use <config> file instead of default
  -c, --context <context>    use <context> instead of current kubernetes context
  -d, --debug                output a stack trace on error

Flags for "yaml" command:
  -o, --output <file>        output base yaml and context overlays to <file>.tgz
  -a, --appname <name>       add the label solsa.ibm.com/app=<name> to all generated resources
```

### Option 3: Developer Install

To contribute to the development of SolSA, you will need to clone this
repository, install, build, and link SolSA:
```shell
git clone https://github.com/IBM/solsa.git
cd solsa
npm install
npm run build
npm link
```
To use your local SolSA checkout in other projects run in each project:
```shell
npm link solsa
```

## Kubernetes Cluster Setup

### Minimal install

We assume that you have already configured `kubectl` or `oc` to be able to
access each Kubernetes cluster you will be using with SolSA.

We assume that you have already installed `kustomize`. If not, please install it
per Kustomize's [install
instructions](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/INSTALL.md)
and adjust your PATH to include it.

Proper configuration of `kubectl`/`oc` and `kustomize` is sufficient to enable
you to use SolSA to generate YAML for all core Kubernetes resource types.

### Optional install: Operators

If you intend to use SolSA to define solutions that include advanced features
such as configuring cloud services or Knative resources, you will need to
install the necessary Operators.  On each cluster, do the following:
1. Install the Composable Operator from https://github.com/IBM/composable.

2. Install the IBM Cloud Operator from https://github.com/IBM/cloud-operators.

3. Install the IBM Event Streams Topic Operator from
   https://github.com/IBM/event-streams-topic.

4. Install the IBM Cloud Functions Operator from
   https://github.com/IBM/cloud-functions-operator.

### Optional install: Knative

If you intend to use SolSA to define solutions that include Knative resources,
you will need a cluster with Knative installed.  For example, if you are using a
cluster provisioned via the IBM Cloud Kubernetes Service, follow the
instructions at https://knative.dev/docs/install/knative-with-iks.

## SolSA Local Configuration File

You can optionally create a `.solsa.yaml` file in your home directory that
describes each Kubernetes context for which you want SolSA to generate a
specialized Kustomize overlay. Just like `kubectl`, `solsa` supports both
cluster-level and context-level specification.

The configuration information in `sosla.yaml` enables cluster-specific and/or
context-specific generation of `Ingress` resources and container image rewrites
such as switching default registries or image tags.

Please refer to the [full
documentation](https://github.com/IBM/solsa/blob/master/docs/SolSAConfig.md) of
`.solsa.yaml` for full details, including ingress specifications for a variety
of kinds of Kubernetes clusters. Shown below is a basic `.solsa.yaml` file that
enables `sosla` to target the Kubernetes v1.14 cluster included in Docker
Desktop v2.1.
```yaml
clusters:
- name: 'docker-desktop'
  ingress:
    nodePort: true
```
We will assume this configuration file in the following example.

## A First Example

A sample SolSA solution is provided in
[helloWorld.js](https://github.com/IBM/solsa/blob/master/samples/helloWorld.js).
```javascript
const solsa = require('solsa')
const bundle = new solsa.Bundle()
module.exports = bundle

bundle.helloWorld = new solsa.ContainerizedService({ name: 'hello-world', image: 'docker.io/ibmcom/kn-helloworld', port: 8080 })
bundle.ingress = bundle.helloWorld.getIngress()
```
It consists of a single containerized service and an ingress for this service.

This solution can be deployed to the current Kubernetes context using the
`solsa` CLI and either `kubectl` or `oc` as follows.
```shell
solsa yaml helloWorld.js | kubectl apply -f -
```
The YAML synthesized by SolSA for this example depends on the SolSA
configuration file used. If no configuration file is used, the ingress
definition is ignored and the CLI outputs a warning message.

Assuming the configuration file provided in the previous section, the YAML
synthesized when targeting cluster `docker-desktop` is
[helloWorld.yaml](https://github.com/IBM/solsa/blob/master/samples/helloWorld.yaml).
In this configuration, SolSA synthesizes `Service` objects with type `NodePort`
for all the exposed service. Moreover, port numbers are assigned dynamically. We
can obtain the port number for the deployed `hello-world` service using command:
```shell
kubectl get service hello-world -o jsonpath={.spec.ports[0].nodePort}
```
```
31509
```
Assuming `1.2.3.4` is the public IP of one of the worker node of the targeted
Kubernetes cluster, we can then query the deployed containerized service using
`curl`:
```shell
curl 1.2.3.4:31509
```
```
Hello World!
```
To undeploy the solution, use the command:
```shell
solsa yaml helloWorld.js | kubectl delete -f -
```

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
