echo ">>> backend build start"
echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
docker build -t ${repository} .
docker push ${repository}
docker rmi ${repository}
echo ">>> backend build finish"