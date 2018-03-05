#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    nodemon boot
else
    node boot
fi
