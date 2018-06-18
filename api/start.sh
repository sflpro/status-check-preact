#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    npm install -g nodemon
    nodemon src/boot;
else
    node src/boot;
fi
