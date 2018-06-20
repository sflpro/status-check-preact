#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    npm install -g nodemon
    nodemon src
else
    node src
fi
