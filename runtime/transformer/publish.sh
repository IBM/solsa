#!/bin/bash

docker build . -t us.icr.io/seed/solsa-transformer
docker push us.icr.io/seed/solsa-transformer
