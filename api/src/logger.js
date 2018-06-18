const pino = require('pino')({
    name: 'api',
    level: process.env.LOG_LEVEL || 'info',
});

module.exports = pino;
