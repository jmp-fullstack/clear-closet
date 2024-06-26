#!/bin/bash

cd project

sudo docker pull sujeong9662/clear-closet:latest
sudo docker-compose down
sudo docker-compose up --build -d