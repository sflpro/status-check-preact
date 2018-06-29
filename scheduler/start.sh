#!/bin/bash

if [ $NODE_ENV == 'development' ]
then
    npm install -g nodemon
    nodemon src
else
    export TIMECARD_HOST = $(cat $TIMECARD_HOST_FILE)
    export TIMECARD_PATH = $(cat $TIMECARD_PATH_FILE)
    export TIMECARD_USER = $(cat $TIMECARD_USER_FILE)
    export TIMECARD_PASS = $(cat $TIMECARD_PASS_FILE)
    node src
fi