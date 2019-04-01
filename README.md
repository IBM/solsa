# SolSA

The SolSA programming model is intended to ease the _development_, _deployment_,
and _integration_ of cloud-native services and applications in a multi-cloud environment.
SolSA makes it possible to compose existing services (cloud services, cloud functions,
container-based services) and event sources into new services and applications.

SolSA leverages Node.js and its package manager `npm` to program services and
applications in a familiar, modular way.

SolSA leverages containers to encapsulate and distribute services.

SolSA leverages Kubernetes operators to manage the life cycle of services
whether they run inside or outside of a Kubernetes cluster. In particular, SolSA
transparently manages service credentials. SolSA can target a standard
Kubernetes cluster or a Knative cluster.

SolSA leverages `kustomize` to permit targeting multiple environments, e.g.,
local development cluster, Kubernetes cluster, Knative cluster.

At the heart of SolSA is a simple template for declaring service parameters and
service dependencies. Thanks to this template, SolSA can automatically identify,
build, deploy, and configure all the services needed by an application.

## Components

SolSA consists of:
- A main `solsa` module that defines the root SolSA service class that every
  SolSA service extends.
- Helper modules like the `watson` module that offer existing IBM cloud services
  as SolSA services.
- Helper tools:
  - `solsa-build` builds and pushes container images for SolSA services.
  - `solsa-yaml` synthesizes "Kustomizable" yaml for deploying SolSA services.

## Configure a Kubernetes Cluster for SolSA

### Cluster-wide Setup

1. Install SEED. Follow the instructions at https://github.ibm.com/seed/charts.

2. Optionally install Knative. For IKS, follow the instructions at
   https://cloud.ibm.com/docs/containers?topic=containers-knative_tutorial#knative_tutorial.

### Per Namespace Setup

1. Create an image pull secret for the IBM Container Registry.

2. Edit the namespace's default service account to add the secret to the list of
   imagePullSecrets.

## Local Setup

1. Configure access to the Kubernetes cluster (`KUBECONFIG`).

2. Login to the IBM container registry.

3. Create a `.solsa.yaml` file in you home directory that describes each
   Kubernetes cluster for which you want SolSA to generate a Kustomize overlay.
   The example file below defines three deployment environments, a local dev
   environment, an IKS cluster, a Knative cluster.
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
   - name: 'myknative'
     nature: 'knative'
       iks:
         subdomain: 'mycluster123.us-east.containers.appdomain.cloud'
         tlssecret: 'mycluster123'
   ```
   The IKS cluster definition demonstrates how to instruct SolSA to generate a
   Kustomize overlay that will rename docker images so that instead of being
   pulled from the local registry on the dev machine, the images will instead be
   pulled from a specific namespace in the IBM Container Registry. Specific
   images can be handled. A default registry can also be specified.

4. Clone and initialize this repository:
   ```sh
   git clone https://github.ibm.com/solsa/solsa.git
   cd solsa
   npm install
   npm link
   ```

## Examples

The [solsa-examples](https://github.ibm.com/solsa/solsa-examples) repository
collects examples of SolSA services.
