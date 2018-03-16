/**
 * The file contains REST endpoints for managing Transactions
 */

const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const Transaction = require('../models/transaction');

router.get('/', async (req, res, next) => {
    const transactions = await Transaction.findAll();
    res.send(transactions);
});
router.post('/', async (req, res, next) => {
    let transactions = req.body,
        upsertPromises = [];
    transactions.forEach(transaction => {
        upsertPromises.push(Transaction.upsert(transaction));
    });
    let result = await upsertPromises;
    res.send('Transactions are successfully inserted!');
});

module.exports = router;
