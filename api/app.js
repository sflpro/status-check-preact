const express = require('express');
const bodyParser = require('body-parser');

const employeesRouter = require('./routes/employees');
const transactionsRouter = require('./routes/transactions');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));

/**
 * Main application routes.
 */
app.use('/api/employees', employeesRouter);
app.use('/api/transactions', transactionsRouter);

module.exports = app;
