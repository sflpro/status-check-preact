#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    npm install -g nodemon
    nodemon index.js
else
    node index.js
fi
