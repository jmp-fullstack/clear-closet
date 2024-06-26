#!/bin/bash

echo ">>> backend build start"
echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
echo "Current directory: $(pwd)"
cd ../backend
echo "Current directory: $(pwd)"
docker build -t ${repository} .
docker push ${repository}
docker rmi ${repository}
echo ">>> backend build finish"