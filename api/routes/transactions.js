/**
 * The file contains REST endpoints for managing Emplyees
 */

const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const sequelize = require('../db');

const Transaction = sequelize.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    employeeId: {
        type: Sequelize.INTEGER,
    },
    action: {
        type: Sequelize.INTEGER,
    },
    deviceId: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.INTEGER,
    },
    insertDate: {
        type: Sequelize.DATE,
    },
    originalDate: {
        type: Sequelize.DATE,
    },
}, {
    timestamps: false,
});

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
