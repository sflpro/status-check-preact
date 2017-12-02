#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    nodemon --inspect index.js
else
    node index.js
fi
