const logger = require('../logger');

const { fetchTransactions, sendTransactions } = require('../helpers/transactions');
const { getFilteredEmployees } = require('../helpers/employees');

async function startTransactionsJob() {
    const employees = await getFilteredEmployees();

    logger.info('Fetching transactions starts');

    const allTransactionsFromStore = await fetchTransactions(employees);

    logger.info('Fetching transactions succeed');

    logger.info('Saving transactions starts');

    await sendTransactions(allTransactionsFromStore);

    logger.info('Saving transactions succeed');
}

module.exports = startTransactionsJob;
