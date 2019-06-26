#!/usr/bin/env bash

DIR=$(pwd)

docker build -t service-worker-example:latest $DIR
docker run --rm -d -p 9992:80 --name=service-worker-example -v $DIR/public:/var/www service-worker-example:latest
