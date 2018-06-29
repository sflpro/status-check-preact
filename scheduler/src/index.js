const logger = require('./logger');
const startEmployeesJob = require('./jobs/employees');
const startTransactionsJob = require('./jobs/transactions');
const { wait } = require('./helpers/utils');

const { env } = process;

const loopTransactionsJob = async () => {
    try {
        logger.info('Scheduling Transactions job.');
        await wait(env.REQUEST_TRANSACTIONS_INTERVAL);
        logger.info('Starting Transactions job.');
        await startTransactionsJob();
        loopTransactionsJob();
    } catch (err) {
        logger.error('Error during Transactions job', err);
        loopTransactionsJob();
    }
};

const loopEmployeesJob = async () => {
    try {
        logger.info('Scheduling Employees job.');
        await wait(env.REQUEST_EMPLOYEES_INTERVAL);
        logger.info('Starting Employees job.');
        await startEmployeesJob();
        loopEmployeesJob();
    } catch (err) {
        logger.error('Error during Employees job.', err);
        loopEmployeesJob();
    }
};

const startScheduler = async () => {
    try {
        logger.info('Staring new scheduler.');
        logger.info('Staring First Employees job.');
        await startEmployeesJob();
        loopEmployeesJob();
        loopTransactionsJob();
    } catch (err) {
        logger.error('Error during start Scheduler.', err);
        startScheduler();
    }
};

startScheduler();

