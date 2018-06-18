const logger = require('../logger');

function errorHandler(err, req, res) {
    if (err.originalError) {
        logger.error(err.originalError);
        if (process.env.development) {
            res.status(err.status).end(err.originalError.stack);
            return;
        }
    }
    res.status(err.status).end(err.message);
}

module.exports = errorHandler;
