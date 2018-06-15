/**
 * The file contains REST endpoints for managing Transactions
 */

const express = require('express');
const router = express.Router();

const logger = require('../logger');
const Transaction = require('../models/transaction');

router.get('/', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch(err) {
        res.status(500).send("An error occurred when getting transactions.");
        logger.error('Error transaction get', err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let transactions = req.body,
            upsertPromises = [];
        transactions.forEach(transaction => {
            upsertPromises.push(Transaction.upsert(transaction));
        });
        let result = await Promise.all(upsertPromises);
        res.send('Transactions are successfully inserted!');
    } catch(err) {
        res.status(500).send("An error occurred when inserting transactions.");
        logger.error('Error transaction post', err);
    }
});

module.exports = router;
