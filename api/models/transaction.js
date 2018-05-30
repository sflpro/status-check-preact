const Sequelize = require('sequelize');

const sequelize = require('../db');

const Employee = require('./employee');

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

Transaction.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = Transaction;
