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