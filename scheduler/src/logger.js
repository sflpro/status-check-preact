const pino = require('pino')({
    name: 'scheduler',
    level: process.env.LOG_LEVEL || 'info',
});

module.exports = pino;
