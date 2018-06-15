#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    npm i -g nodemon;
    nodemon boot;
else
    node boot;
fi
