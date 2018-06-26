const logger = require('../logger');

const { getAllEmployeesFromStore, sendEmployees } = require('../helpers/employees');

async function startEmployeesJob() {
    const allEmployeesFromStore = await getAllEmployeesFromStore();

    logger.info('Saving employees starts');

    await sendEmployees(allEmployeesFromStore);

    logger.info('Saving employees succeed');
}

module.exports = startEmployeesJob;
