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

case $(uname -ms) in
  'Linux x86_64')
    echo 'Downloading kustomize for Linux.'
    curl -L -o tools/kustomize https://github.com/kubernetes-sigs/kustomize/releases/download/v3.2.0/kustomize_3.2.0_linux_amd64 && chmod a+x tools/kustomize
    ;;

  'Darwin x86_64')
    echo 'Downloading kustomize for Darwin.'
    curl -L -o tools/kustomize https://github.com/kubernetes-sigs/kustomize/releases/download/v3.2.0/kustomize_3.2.0_darwin_amd64 && chmod a+x tools/kustomize
    ;;

  *)
    echo 'Unsupported platform. Please install kustomize and adjust your PATH to include it.'
    ;;
esac
