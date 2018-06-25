const logger = require('../logger');

const { getAllEmployeesFromStore, sendEmployees } = require('../helpers/employees');

const { env } = process;

async function startEmployeesJob() {
    try {
        const allEmployeesFromStore = await getAllEmployeesFromStore();

        logger.info('Saving employees starts');

        await sendEmployees(allEmployeesFromStore);

        logger.info('Saving employees succeed');

        setTimeout(startEmployeesJob, env.REQUEST_EMPLOYEES_INTERVAL);
    } catch (err) {
        logger.error('fetching or saving employees', err.message);
        setTimeout(startEmployeesJob, env.REQUEST_EMPLOYEES_INTERVAL);
    }
}

setTimeout(() => {
    logger.info('Running Employees jobs start.');
    startEmployeesJob();
}, env.MINIMUM_JOB_TIMEOUT);
