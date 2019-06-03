#!/bin/bash

SCRIPTDIR=$(cd $(dirname "$0") && pwd)

SECRET=$(kubectl get secrets -n seed-operators seed-seed-registry -o jsonpath='{.data.\.dockerconfigjson}')
sed "s/\$SECRET/$SECRET/" "$SCRIPTDIR/solsaNamespaceSetup.yaml" | kubectl apply -f - $*
