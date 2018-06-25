const requestPromise = require('request-promise-native');

const xmlRpcClient = require('../clients/xmlRpc');

const { env } = process;

exports.fetchTransactions = (employees) => {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setDate(startDate.getDate() - env.REQUEST_FROM);
    endDate.setDate(endDate.getDate() + env.REQUEST_TO);

    const transactionsPromise = xmlRpcClient.methodCall('GetTransactions', [
        employees.map(employee => employee.id), startDate, endDate,
    ]);
    return transactionsPromise;
};

exports.sendTransactions = (transactions) => {
    const tactions = [];
    transactions.forEach((transactionPerEmployee) => {
        transactionPerEmployee.Transactions.forEach((transaction) => {
            const {
                Id, Action, DeviceId, Status, InsertDate, OriginalDate,
            } = transaction;
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
};
