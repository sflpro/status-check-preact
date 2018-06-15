const logger = require('./logger');
const xmlrpc = require('xmlrpc');
const { promisify } = require('util');
const requestPromise = require('request-promise-native');

const env = process.env;

const xmlRpcClient = xmlrpc.createClient({
    host: env.TIMECARD_HOST,
    port: 3003,
    path: env.TIMECARD_PATH,
    basic_auth: {
        user: env.TIMECARD_USER,
        pass: env.TIMECARD_PASS,
    },
});

const methodCall = promisify(xmlRpcClient.methodCall.bind(xmlRpcClient));

function fetchEmployees() {
    return methodCall('GetAllEmployeesShort', []);
}

function fetchTransactions(employees) {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - env.REQUEST_FROM);
    endDate.setDate(endDate.getDate() + env.REQUEST_TO);
    return methodCall('GetTransactions', [employees.map(employee => employee.id), startDate, endDate]);
}

function sendEmployees(employees) {
    const empls = employees.map(employee => ({
        code: employee.Code,
        badge: employee.Badge,
        firstName: employee.Name,
        middleName: employee.MiddleName,
        lastName: employee.LastName,
        fullName: employee.FullName,
        active: employee.Active,
    }));
    const options = {
        method: 'POST',
        uri: `${env.API_ENDPOINT}/employees`,
        body: empls,
        json: true,
    };
    return requestPromise(options);
}

function sendTransactions(transactions) {
    let tactions = [];
    transactions.forEach(transactionPerEmployee => {
        transactionPerEmployee.Transactions.forEach(transaction => {
            let { Id, Action, DeviceId, Status, InsertDate, OriginalDate } = transaction;
            tactions.push({
                id: Id,
                employeeId: transactionPerEmployee.EmployeeId,
                action: Action,
                deviceId: DeviceId,
                status: Status,
                insertDate: InsertDate,
                originalDate: OriginalDate,
            });
        });
    });
    const options = {
        method: 'POST',
        uri: `${env.API_ENDPOINT}/transactions`,
        body: tactions,
        json: true,
    };
    return requestPromise(options);
}

function start() {
    logger.info('Fetching employees starts');
    let employees;
    fetchEmployees()
        .then(empls => {
            logger.info('Fetching employees succeed');
            employees = empls;
            return empls.map(employee => ({
                id: employee.Id,
                name: employee.FullName
            }))
        })
        .then(empls => {
            logger.info('Fetching transaction starts');
            return fetchTransactions(empls);
        })
        .then(transactions => {
            logger.info('Fetching transaction succeed');
            logger.info('Saving employees and transactions starts');
            return Promise.all([sendEmployees(employees), sendTransactions(transactions)]);
        })
        .then(() => {
            logger.info('Saving employees and transactions succeed');
            setTimeout(start, env.REQUEST_INTERVAL);
        })
        .catch(err => {
            logger.error('fetching or saving failes', err);
            setTimeout(start, env.REQUEST_INTERVAL);
        });
}

logger.info('Running jobs start.');
start();


