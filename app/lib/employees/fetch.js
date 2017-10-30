const xmlrpc = require('xmlrpc');

const client = xmlrpc.createClient({
    host: process.env.TIMECARD_HOST,
    port: 3003,
    path: process.env.TIMECARD_PATH,
    basic_auth: {
        user: process.env.TIMECARD_USER,
        pass: process.env.TIMECARD_PASS,
    },
});

module.exports = () => {
    return new Promise((resolve, reject) => {
        let employees = {};
        const employeesIds = [];
        client.methodCall('GetAllEmployeesShort', [], (error, response) => {
            if (error) {
                reject(error);
            }
            for (let i = 0; i < response.length; i++) {
                if (response[i].Active) {
                    employees[response[i].Id] = {};
                    employees[response[i].Id].fullName = response[i].FullName;
                    employees[response[i].Id].id = response[i].Id;
                    employees[response[i].Id].lastStatusChange = null;
                    employees[response[i].Id].status = null;
                    employeesIds.push(response[i].Id);
                }
            }

            const startDate = new Date();
            const endDate = new Date();
            startDate.setDate(endDate.getDate() - 3);
            endDate.setDate(endDate.getDate() + 1);
            client.methodCall('GetTransactions', [employeesIds, startDate, endDate], (err, res) => {
                if (err) {
                    reject(err);
                }
                for (let i = 0; i < res.length; i++) {
                    const current = res[i];
                    const lastTransaction = current.Transactions[current.Transactions.length - 1];

                    employees[current.EmployeeId].lastStatusChange = lastTransaction.InsertDate;
                    employees[current.EmployeeId].status = lastTransaction.DeviceId === 3 ? "in" : "out";
                }

                employees = Object.keys(employees).map(k => employees[k]);
                resolve(employees);
            });
        });
    });
};
