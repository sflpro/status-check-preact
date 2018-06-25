const { fetchTransactions, sendTransactions } = require('../helpers/transactions');
const { getFilteredEmployees } = require('../helpers/employees');
const logger = require('../logger');

const { env } = process;

async function startTransactionsJob() {
    try {
        const employees = await getFilteredEmployees();

        logger.info('Fetching transactions starts');

        const allTransactionsFromStore = await fetchTransactions(employees);

        logger.info('Fetching transactions succeed');

        logger.info('Saving transactions starts');

        await sendTransactions(allTransactionsFromStore);

        logger.info('Saving transactions succeed');

        setTimeout(startTransactionsJob, env.REQUEST_TRANSACTIONS_INTERVAL);
    } catch (err) {
        logger.error('fetching or saving transactions', err.message);
        setTimeout(startTransactionsJob, env.REQUEST_TRANSACTIONS_INTERVAL);
    }
}

setTimeout(() => {
    logger.info('Running Transactions jobs start.');
    startTransactionsJob();
}, env.MINIMUM_JOB_TIMEOUT);
