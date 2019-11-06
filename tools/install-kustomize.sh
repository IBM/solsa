#!/bin/bash

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

KUSTOMIZE_VERSION=3.3.0

case $(uname -ms) in
  'Linux x86_64')
      echo 'Downloading kustomize for Linux.'
      opsys=linux
    ;;

  'Darwin x86_64')
      echo 'Downloading kustomize for Darwin.'
      opsys=darwin
    ;;

  *)
    echo 'Unsupported platform. Please install kustomize and adjust your PATH to include it.'
    ;;
esac

cd tools
curl -L -o kustomize.tgz https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize/v${KUSTOMIZE_VERSION}/kustomize_v${KUSTOMIZE_VERSION}_${opsys}_amd64.tar.gz
tar xzf kustomize.tgz
rm -f kustomize.tgz
chmod +x kustomize
