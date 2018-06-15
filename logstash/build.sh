#!/bin/bash
set -ev

docker build -t postgres .
docker tag postgres sflpro/status-check-logstash:latest
docker push sflpro/status-check-logstash:latest
