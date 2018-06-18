/**
 * The file contains REST endpoints for managing Emplyees
 */

const express = require('express');

const router = express.Router();

const EmployeesController = require('../controllers/employeesController');

router.get('/', EmployeesController.getEmployees);

router.post('/', EmployeesController.addEmployees);

router.get('/statuses', EmployeesController.getStatuses);

module.exports = router;
