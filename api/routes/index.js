const express = require('express');
const routes = express.Router();

const employeesRouter = require('./employees');
const transactionsRouter = require('./transactions');

routes.use('/api/employees', employeesRouter);
routes.use('/api/transactions', transactionsRouter);

module.exports = routes;
