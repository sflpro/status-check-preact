const Transaction = require('../models/transaction');

const errorHelper = require('../helpers/errorHelper');

const TransactionsControllers = {};

TransactionsControllers.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll();
        res.json(transactions);
    } catch (err) {
        next(errorHelper.createHttpError(err, 500, 'An error occurred when getting transactions.'));
    }
};

TransactionsControllers.addTransactions = async (req, res, next) => {
    try {
        const transactions = req.body;
        const upsertPromises = [];
        transactions.forEach((transaction) => {
            upsertPromises.push(Transaction.upsert(transaction));
        });
        await Promise.all(upsertPromises);
        res.end('Transactions are successfully inserted!');
    } catch (err) {
        next(errorHelper.createHttpError(err, 500, 'An error occurred when inserting transactions.'));
    }
};

module.exports = TransactionsControllers;
