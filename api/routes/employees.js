/**
 * The file contains REST endpoints for managing Emplyees
 */

const express = require('express');
const Sequelize = require('sequelize');
const router = express.Router();

const Employee = require('../models/employee');

router.get('/', async (req, res, next) => {
    const employees = await Employee.findAll();
    res.send(employees);
});
router.get('/statuses', async (req, res, next) => {
    res.send([]);
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
