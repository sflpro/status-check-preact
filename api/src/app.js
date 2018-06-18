const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use(routes);

module.exports = app;
