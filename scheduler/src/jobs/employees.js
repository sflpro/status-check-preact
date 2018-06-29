const logger = require('../logger');

const { getAllEmployeesFromStore, sendEmployees } = require('../helpers/employees');

async function startEmployeesJob() {
    const allEmployeesFromStore = await getAllEmployeesFromStore();

    logger.info('Saving Employees starts.');

    await sendEmployees(allEmployeesFromStore);

    logger.info('Saving Employees succeed.');
}

module.exports = startEmployeesJob;
