# SolSA

The SolSA programming model is intended to ease the _development_, _deployment_,
and _integration_ of cloud-native services and applications.
SolSA makes it possible to compose existing services (cloud services, cloud functions,
container-based services) and event sources into new services and
applications. SolSA also enables the specification of application
architectural patterns as executable code that can be leveraged to
create reusable and repeatable cloud native applications.

SolSA leverages Node.js and its package manager `npm` to program services and
applications in a familiar, modular way.

SolSA leverages containers to encapsulate and distribute services.

SolSA leverages Kubernetes operators to manage the life cycle of services
whether they run inside or outside of a Kubernetes cluster. In particular, SolSA
transparently manages service credentials.

SolSA includes support for Knative and is able to deploy resources
such as Knative Serving services and Knative Eventing sources,
producers, channels, etc. as part of an application solution.

SolSA leverages `kustomize` to permit targeting multiple environments, e.g.,
local development cluster, Kubernetes cluster, Knative cluster.

SolSA includes an optional capability to write program logic
leveraging widely used frameworks such as `Express.js` without
requiring explicit specification of how such logic will be
containerized. This enables light-weight specification of glue
code and business logic for integrating existing containerized
components and external cloud services.

At the heart of SolSA is a simple set of programming conventions for
declaring service parameters and service dependencies as executable
code. When developers follow these conventions, SolSA can
automatically identify, optionally build, deploy, and configure all
the services needed by an application.

## Components

SolSA consists of:
- A main `solsa` module that provides a library of high-level
abstractions for defining the software architecture of an
application.
- Helper tools:
  - `solsa-build` builds and pushes container images for SolSA-defined services.
  - `solsa-yaml` synthesizes "Kustomizable" yaml for deploying SolSA
     applications on Kubernetes.

## Configure a Kubernetes Cluster for SolSA

### Cluster-wide Setup

1. Install SEED. Follow the instructions at https://github.ibm.com/seed/charts.

2. Optionally install Knative. For IKS, follow the instructions at
   https://cloud.ibm.com/docs/containers?topic=containers-knative_tutorial#knative_tutorial.

   NOTE: There is a bug in the IKS installation of Knative 0.4.1 that results in a misconfigured istio ingress.
   After installing Knative, execute `kubectl edit ing iks-knative-ingress -n istio-system` and change `_place_holder_for_ingress_secret`
   to the real value of your Ingress Secret obtained via `bx cs cluster-get <MY_CLUSTER_NAME>`

### Per Namespace Setup

1. Create an image pull secret for the IBM Container Registry.

2. Edit the namespace's default service account to add the secret to the list of
   imagePullSecrets.

## Local Setup

1. Configure `kubectl` to access your Kubernetes cluster(s).

2. Login to the IBM container registry if any of your clusters are IKS clusters.

3. Create a `.solsa.yaml` file in your home directory that describes each
   Kubernetes cluster for which you want SolSA to generate a Kustomize overlay.
   The example file below defines two deployment environments, a local dev
   environment that uses a NodePort ingress and an IKS cluster.
   ```yaml
   clusters:
   - name: 'localdev'
     ingress:
       nodePort: 32323
   - name: 'mycluster'
     ingress:
       iks:
         subdomain: 'mycluster123.us-east.containers.appdomain.cloud'
         tlssecret: 'mycluster123'
     registry: 'us.icr.io/tardieu'
     images:
     - name: solsa-translator
       newName: us.icr.io/groved/solsa-translator
   ```
   The IKS cluster definition demonstrates how to instruct SolSA to generate a
   Kustomize overlay that will rename docker images so that instead of being
   pulled from the local registry on the dev machine, the images will instead be
   pulled from a specific namespace in the IBM Container Registry. Specific
   images can also be handled. A default registry can also be specified.

4. Clone and initialize this repository:
   ```sh
   git clone https://github.ibm.com/solsa/solsa.git
   cd solsa
   npm install
   npm link
   ```

## Examples

The [solsa-examples](https://github.ibm.com/solsa/solsa-examples) repository
contains sample cloud native applications and architectural patterns defined using SolSA.

A SolSA application `myApp.js` can be built and deployed to the IKS
cluster `mycluster` defined above by using `solsa-build`, `solsa-yaml`
and `kubectl` (v1.14) as shown below.
```shell
sosla-build --push mycluster myApp.js
sosla-yaml -o myApp myApp.js
tar xzf myApp.tgz
kubectl apply -k myApp/mycluster
```
To undeploy the application, use the command
```shell
kubectl delete -k myApp/mycluster
```

Note that `kustomize` support was recently added to `kubectl` in
version 1.14.  With older versions of `kubectl` you will need to
install a standalone `kustomize` cli and instead do:
```shell
kustomize build myApp/mycluster | kubectl apply -f -
```
or
```shell
kustomize build myApp/mycluster | kubectl delete -f -
```
