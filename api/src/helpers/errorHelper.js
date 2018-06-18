const createError = require('http-errors');

exports.createHttpError = (err, status, message) => {
    const httpError = createError(status, message);
    httpError.originalError = err;
    return httpError;
};
