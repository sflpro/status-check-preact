const express = require('express');

const routes = express.Router();

const employeesRouter = require('./employees');
const transactionsRouter = require('./transactions');
const errorHandler = require('../handlers/errorHandler');

routes.use('/api/employees', employeesRouter);
routes.use('/api/transactions', transactionsRouter);

routes.use(errorHandler);

module.exports = routes;
