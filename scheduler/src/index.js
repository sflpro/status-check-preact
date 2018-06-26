const logger = require('./logger');
const startEmployeesJob = require('./jobs/employees');
const startTransactionsJob = require('./jobs/transactions');

const { env } = process;

const runTransactionsJob = () => {
    logger.info('Scheduling Transactions job.');
    setTimeout(async () => {
        try {
            logger.info('Starting Transactions job.');
            startTransactionsJob();
        } catch (err) {
            logger.error('Error during Transactions job', err);
            runTransactionsJob();
        }
    }, env.REQUEST_TRANSACTIONS_INTERVAL);
};

const runEmployeesJob = () => {
    logger.info('Scheduling Employees job.');
    setTimeout(async () => {
        try {
            logger.info('Starting Employees job.');
            startEmployeesJob();
        } catch (err) {
            logger.error('Error during Employees job.', err);
            runEmployeesJob();
        }
    }, env.REQUEST_EMPLOYEES_INTERVAL);
};

const startScheduler = async () => {
    try {
        logger.info('Staring new scheduler.');
        await runEmployeesJob();
        runTransactionsJob();
    } catch (err) {
        logger.error('Error during start Scheduler.', err);
        startScheduler();
    }
};

startScheduler();

