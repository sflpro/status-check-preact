/**
 * The file contains REST endpoints for managing Transactions
 */

const express = require('express');

const router = express.Router();

const TransactionsControllers = require('../controllers/transactionsController');

router.get('/', TransactionsControllers.getTransactions);

router.post('/', TransactionsControllers.addTransactions);

module.exports = router;
