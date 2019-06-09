#!/usr/bin/env bash

DIR=$(pwd)

docker build -t web-worker-example:latest $DIR
docker run --rm -d -p 9991:80 --name=web-worker-example -v $DIR/public:/var/www web-worker-example:latest
