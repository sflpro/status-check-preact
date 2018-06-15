const sequelize = require('sequelize');

const logger = require('../logger');
const Employee = require('../models/employee');
const Transaction = require('../models/transaction');

const EmployeeController = {};

EmployeeController.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).send('An error occurred when getting employees.');
    logger.error('Error employee get', err);
  }
};

EmployeeController.addEmployees = async (req, res) => {
  try {
    const employees = req.body;
    const upsertPromises = [];

    employees.forEach((employee) => {
      upsertPromises.push(Employee.upsert(employee));
    });

    await Promise.all(upsertPromises);
    res.send('Employees are successfully inserted!');
  } catch (err) {
    res.status(500).send('An error occurred when inserting employees.');
    logger.error('Error employee post', err);
  }
};

EmployeeController.getStatuses = async (req, res) => {
  try {
    const allActiveEmployees = await Employee.findAll({
      where: {
        active: true,
      },
      group: ['employee.code', 'employee.fullName'],
      attributes: [
        'code',
        'fullName',
      ],
    });
    const actEmployeesWithTransPromises = allActiveEmployees.map(employee => Transaction.findOne({
      where: {
        employeeId: employee.code,
      },
      attributes: [
        'deviceId',
        [sequelize.fn('max', sequelize.col('originalDate')), 'lastStatusChange'],
      ],
      group: [
        'deviceId',
      ],
      order: [
        [sequelize.fn('max', sequelize.col('originalDate')), 'desc'],
      ],
    }).then((lastTransaction) => {
      if (lastTransaction) {
        const lastTransactionJSON = lastTransaction.toJSON();
        return {
          id: employee.code,
          fullName: employee.fullName,
          lastStatusChange: lastTransactionJSON.lastStatusChange,
          status: lastTransactionJSON.deviceId === 3 ? 'in' : 'out',
        };
      }
      return null;
    }));

    const actEmployeesWithTrans = await Promise.all(actEmployeesWithTransPromises);
    const employessWithLastTrans = actEmployeesWithTrans.filter(e => !!e);

    res.json(employessWithLastTrans);
  } catch (err) {
    res.status(500).send('An error occurred when getting employee statuses.');
    logger.error('Error employee post', err);
  }
};

module.exports = EmployeeController;
