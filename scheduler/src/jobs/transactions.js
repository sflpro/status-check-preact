const logger = require('../logger');

const { fetchTransactions, sendTransactions } = require('../helpers/transactions');
const { getFilteredEmployees } = require('../helpers/employees');

async function startTransactionsJob() {
    const employees = await getFilteredEmployees();

    logger.info('Fetching Transactions starts.');

    const allTransactionsFromStore = await fetchTransactions(employees);

    logger.info('Fetching Transactions succeed.');

    logger.info('Saving Transactions starts.');

    await sendTransactions(allTransactionsFromStore);

    logger.info('Saving Transactions succeed.');
}

module.exports = startTransactionsJob;
