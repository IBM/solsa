SECRET=$(kubectl get secrets -n seed-operators seed-seed-registry -o jsonpath='{.data.\.dockerconfigjson}')
sed "s/\$SECRET/$SECRET/" soslaNamespaceSetup.yaml | kubectl apply -f - $*
