#!/bin/bash
set -ev

docker build -t scheduler .
docker tag scheduler sflpro/status-check-scheduler:latest
docker push sflpro/status-check-scheduler:latest
