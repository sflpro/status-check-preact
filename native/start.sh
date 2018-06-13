#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    nodemon index.js
else
    node index.js
fi
