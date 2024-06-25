#!/bin/bash

cd project

sudo docker pull
sudo docker-compose down
sudo docker-compose up --build -d