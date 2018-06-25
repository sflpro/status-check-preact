const requestPromise = require('request-promise-native');

const xmlRpcClient = require('../clients/xmlRpc');
const logger = require('../logger');

const { env } = process;

const fetchEmployees = () => xmlRpcClient.methodCall('GetAllEmployeesShort', []);

const sendEmployees = (employees) => {
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
};

const filterEmployees = allEmployeesFromStore =>
    allEmployeesFromStore.map(employee => ({
        id: employee.Id,
        name: employee.FullName,
    }));

const getAllEmployeesFromStore = async () => {
    logger.info('Fetching employees starts');

    const allEmployeesFromStore = await fetchEmployees();

    logger.info('Fetching employees succeed');

    return allEmployeesFromStore;
};

const getFilteredEmployees = async () => {

    const allEmployeesFromStore = await getAllEmployeesFromStore();

    const employees = filterEmployees(allEmployeesFromStore);

    return employees;
};

module.exports = {
    sendEmployees,
    getFilteredEmployees,
    getAllEmployeesFromStore,
};
