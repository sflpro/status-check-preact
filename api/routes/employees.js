/**
 * The file contains REST endpoints for managing Emplyees
 */

const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();

const logger = require('../logger');
const Employee = require('../models/employee');
const Transaction = require('../models/transaction');

router.get('/', async (req, res, next) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch(err) {
        res.status(500).send("An error occurred when getting employees");
        logger.error('Error employee get', err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let employees = req.body,
        upsertPromises = [];

        employees.forEach(employee => {
            upsertPromises.push(Employee.upsert(employee));
        });
        let result = await Promise.all(upsertPromises);
        res.send('Employees are successfully inserted!');
    } catch(err) {
        res.status(500).send("An error occurred when inserting employees.");
        logger.error('Error employee post', err);
    }
});

router.get('/statuses', async (req, res, next) => {
    try {
        const employeesInPostgres = await Employee.findAll({
            group: ['employee.code', 'employee.fullName', 'employee.active', 'transaction.employeeId', 'transaction.id'],
            attributes: [
                'code',
                'fullName',
                'active',
                [sequelize.fn('max', sequelize.col('transaction.originalDate')), 'lastStatusChange']
            ],
            include: [{
                model: Transaction,
                attributes: ['originalDate', 'employeeId']
            }]
        });
        const employees = employeesInPostgres.map((e) => ({
            id: e.code,
            fullName: e.fullName,
            lastStatusChange: e.lastStatusChange,
            status: e.active == 1 ? 'in' : 'out'
        }));
        res.json(employees);       
    } catch (err) {
        res.status(500).send("An error occurred when getting employee statuses");
        logger.error('Error employee post', err);
    }
});

module.exports = router;
