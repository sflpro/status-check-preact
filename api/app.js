const express = require('express');
const bodyParser = require('body-parser');

const employeesRouter = require('./routes/employees');
const transactionsRouter = require('./routes/transactions');

const app = express();

app.use(bodyParser.json());

/**
 * Main application routes.
 */
app.use('/api/employees', employeesRouter);
app.use('/api/transactions', transactionsRouter);

module.exports = app;
