const logger = require('../logger');
const Transaction = require('../models/transaction');

const TransactionsControllers = {};

TransactionsControllers.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch(err) {
        res.status(500).send("An error occurred when getting transactions.");
        logger.error('Error transaction get', err);
    }
};

TransactionsControllers.addTransactions = async (req, res, next) => {
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
};

module.exports = TransactionsControllers;
