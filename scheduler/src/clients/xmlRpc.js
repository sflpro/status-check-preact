const xmlrpc = require('xmlrpc');
const { promisify } = require('util');

const { env } = process;

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

module.exports = {
    methodCall,
};
