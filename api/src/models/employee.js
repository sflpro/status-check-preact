const Sequelize = require('sequelize');

const sequelize = require('../db');

const Employee = sequelize.define('employee', {
  code: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  badge: {
    type: Sequelize.INTEGER,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  middleName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  fullName: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
}, {
  timestamps: false,
});

module.exports = Employee;
