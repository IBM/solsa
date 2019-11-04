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

# SolSA Configuration File

The `solsa` cli supports an optional YAML configuration file that can enable
cluster and/or context level specialization of the output of `solsa yaml`.
This file documents the supported configuration options.

## Specifying the configuration file

If the environment variable `SOLSA_CONFIG` is set, then its value specifies the
configuration file to be loaded.  The command line argument `--config <file>` may
also be used to specify the configuration file to be loaded.  If there is no
explicit setting, the `solsa` cli
will look for a file called `.solsa.yaml` in your home directory.

If a configuration file is not specified, is not found, or contains invalid YAML,
`solsa` will report a warning and only generate a `base` layer of YAML
that could be applied to any Kubernetes cluster.

## Clusters and Contexts

The primary stanzas in the SolSA configuration file are a list of `clusters` and an optional
list of `contexts`.  Every cluster must specify a `name` and may specify additional
attributes as described in subsequent sections.  Every context must specify a `name` and
a `cluster` and may specify additional attributes as described in subsequent sections.
```yaml
clusters:
- name: 'docker-desktop'
  ...
- name: 'mycluster1'
  ...

contexts:
- name: 'local'
  cluster: 'docker-desktop'
  ...
```

## Ingress

### NodePort

The simplest type of `Ingress` is a `NodePort` with dynamically assigned port numbers.
This style of ingress can be used with any Kubernetes cluster.
It is specified by adding the stanza below to either a `cluster` or `context`:
```yaml
  ingress:
    nodePort: true
```

It is also possible to specify that particular services should be assigned to
fixed port numbers.  Any service not explicitly assigned will continue to receive
a dynamic port assignment.
```yaml
  ingress:
    nodePort:
    - name: my-service-one
      port: 32123
    - name: my-service-two
      port: 32124
```

### IBM Cloud Kubernetes Service Standard Cluster

An IBM Cloud Kubernetes Service Standard Cluster includes an Ingress controller and
Application Load Balancer that support TLS termination.  To enable `solsa` to generate
YAML for this style of Ingress you must provide the Ingress Subdomain and Ingress Secret
of your cluster.  First, get this information using the command: `ibmcloud ks cluster-get --cluster <cluster-name>`
Then fill in the values of `Ingress Subdomain` and `Ingress Secret` from the output of `cluster-get`
into the YAML stanza below.
```yaml
  ingress:
     iks:
       subdomain: <Ingress Subdomain>
       tlssecret: <Ingress Secret>
```

### OpenShift Cluster

An OpenShift Cluster supports defining `Routes` that support TLS termination.
To enable `solsa` to generate YAML for this style of Ingress enable it by adding the
stanza below to either a `cluster` or `context`:
```yaml
  ingress:
    os: true
```

## Image Renames

The SolSA configuration file can also be used to specify a variety of image renaming operations.

### Default container registry

You can specify a default container registry to use for all container images that do
not explicitly specify their registry by adding the YAML below to a `cluster` or `context`:
```yaml
  registry: 'registry.name/org'
```

### Default image tag

You can specify a default image tag to use for all container images that do
not explicitly specify an image tag by adding the YAML below to a `cluster` or `context`:
```yaml
  defaultTag: 'myDefaultImageTag'
```

### Kustomize-style image renamings

SolSA support the full range of Kustomize image renaming operations for
specific images via a list of renaming operations under the `images` element.
For example,
```yaml
  images:
  - name: 'kn-helloworld'
    newName: 'docker.io/ibmcom/kn-helloworld'
```
Please consult the Kustomize documentation for a detailed description of the
supported image renaming operations.

## Example

The example configuration file belows shows how the various supported features may
be combined in a single SolSA configuration file.
```yaml
clusters:
- name: 'docker-desktop'
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
      subdomain: 'myrhoscluster-0139ae49851705507802c3fbbaa73a82-0001.us-east.containers.appdomain.cloud'
contexts:
- name: localdev
  cluster: 'docker-desktop'
  defaultTag: dev
  ingress:
    nodePort:
    - name: my-library-productpage
      port: 32123
    - name: my-library-ratings
      port: 32124
```
