/**
 * The file contains REST endpoints for managing Emplyees
 */

const express = require('express');
const router = express.Router();

const logger = require('../logger');
const Employee = require('../models/employee');
const db = require('../db');
const queries = require('../db/queries');

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
        const employees = await db.query(queries.getStatuses, { type: db.QueryTypes.SELECT});
        res.json(employees);
    } catch (err) {
        res.status(500).send("An error occurred when getting employee statuses");
        logger.error('Error employee post', err);
    }
});

module.exports = router;
