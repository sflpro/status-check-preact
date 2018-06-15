const sequelize = require('sequelize');

const logger = require('../logger');
const Employee = require('../models/employee');
const Transaction = require('../models/transaction');

const EmployeeController = {};

EmployeeController.getEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch(err) {
        res.status(500).send("An error occurred when getting employees.");
        logger.error('Error employee get', err);
    }
};

EmployeeController.addEmployees = async (req, res, next) => {
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
};

EmployeeController.getStatuses = async (req, res, next) => {
    try {
        const allActiveEmployees = await Employee.findAll({
            where: {
                active: true
            },
            group: ['employee.code', 'employee.fullName'],
            attributes: [
                'code',
                'fullName'
            ]
        });
        const activeEmployeesWithTransactionsPromises = allActiveEmployees.map((employee) => {
            return Transaction.findOne({
                where: {
                    employeeId: employee.code
                },
                attributes: [
                    'deviceId',
                    [sequelize.fn('max', sequelize.col('originalDate')), 'lastStatusChange']
                ],
                group: [
                    'deviceId'
                ],
                order: [
                    [sequelize.fn('max', sequelize.col('originalDate')), 'desc']
                ]
            }).then((lastTransaction) => {
                if (lastTransaction) {
                    const lastTransactionJSON = lastTransaction.toJSON();
                    return {
                        id: employee.code,
                        fullName: employee.fullName,
                        lastStatusChange: lastTransactionJSON.lastStatusChange,
                        status: lastTransactionJSON.deviceId == 3 ? 'in' : 'out'
                    }
                }
            });
        });
        
        const activeEmployeesWithTransactions = await Promise.all(activeEmployeesWithTransactionsPromises);
        const employessWithLastTransaction = activeEmployeesWithTransactions.filter((e) => !!e);

        res.json(employessWithLastTransaction);
    } catch (err) {
        console.log(err)
        res.status(500).send("An error occurred when getting employee statuses.");
        logger.error('Error employee post', err);
    }
};

module.exports = EmployeeController;