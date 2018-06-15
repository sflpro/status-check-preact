#!/bin/bash
set -ev

docker build -t postgres .
docker tag postgres sflpro/status-check-postgres:latest
docker push sflpro/status-check-postgres:latest
