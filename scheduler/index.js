const redis = require('redis');
const xmlrpc = require('xmlrpc');
const { promisify } = require('util');

const redisClient = redis.createClient('6379', 'redis');

const xmlRpcClient = xmlrpc.createClient({
    host: process.env.TIMECARD_HOST,
    port: 3003,
    path: process.env.TIMECARD_PATH,
    basic_auth: {
        user: process.env.TIMECARD_USER,
        pass: process.env.TIMECARD_PASS,
    },
});

const methodCall = promisify(xmlRpcClient.methodCall.bind(xmlRpcClient));

function fetchEmployees() {
    let employeesShort;
    return methodCall('GetAllEmployeesShort', [])
        .then(employees => employees.filter(employee => employee.Active))
        .then(employees => employees.map(employee => ({
            id: employee.Id,
            name: employee.FullName
        })))
        .then(employees => {
            employeesShort = employees;
            const startDate = new Date();
            const endDate = new Date();
            startDate.setDate(startDate.getDate() - 3);
            endDate.setDate(endDate.getDate() + 1);
            return methodCall('GetTransactions', [employees.map(employee => employee.id), startDate, endDate])
        })
        .then(transactions => {
            return transactions.reduce((accumulator, currentValue) => {
                const id = currentValue.EmployeeId;
                const transactions = currentValue.Transactions;
                const lastTransaction = transactions[transactions.length - 1];

                accumulator[id] = {};
                accumulator[id].status = lastTransaction.DeviceId === 3 ? 'in' : 'out';
                accumulator[id].lastStatusChange = lastTransaction.InsertDate;
                return accumulator;
            }, {});
        })
        .then(transactions => {
            return employeesShort.map(employee => {
                employee.status = transactions[employee.id] ? transactions[employee.id].status : 'out';
                employee.lastStatusChange = transactions[employee.id] ? transactions[employee.id].lastStatusChange : null;
                return employee;
            });
        });
}

function start() {
    fetchEmployees()
        .then(result => {
            redisClient.set('employees', JSON.stringify(result));
            console.log('Employees are successfully fetched');
            setTimeout(start, 10000);
        })
        .catch(err => {
            console.error('Error fetching the list of employees', err)
            setTimeout(start, 10000);
        });
}

start();
