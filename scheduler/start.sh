#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    npm i -g nodemon;
    nodemon index.js
else
    node index.js
fi
