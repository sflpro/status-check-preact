/**
 * The file contains REST endpoints for managing Emplyees
 */

const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const sequelize = require('../db');

const Employee = sequelize.define('employee', {
    code: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    badge: {
        type: Sequelize.INTEGER
    },
    firstName: {
        type: Sequelize.STRING
    },
    middleName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    fullName: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN
    },
}, {
    timestamps: false,
});

router.get('/', async (req, res, next) => {
    const employees = await Employee.findAll();
    res.send(employees);
});
router.post('/', async (req, res, next) => {
    let employees = req.body,
        upsertPromises = [];
    employees.forEach(employee => {
        upsertPromises.push(Employee.upsert(employee));
    });
    let result = await upsertPromises;
    res.send('Employees are successfully inserted!');
});

module.exports = router;
