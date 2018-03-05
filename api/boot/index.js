/**
 * This is the bootstrap logic of the application heavily inspired by express-generator.
 */

const http = require('http');
const logger = require('../logger');
const pinoExpress = require('express-pino-logger')({ logger });
const db = require('../db');
const app = require('../app');

const PORT = process.env.PORT || 8080;

/**
 * Creating a raw HTTP server instead of using express.listen
 * allows to make integrating tools like socket.io easier.
 */
const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Log HTTP requests and responses.
 */
app.use(pinoExpress);

/**
 * Wait for the connection with the database before starting the server.
 */
db
    .authenticate()
    .then(() => {
        logger.info('Database connected.');
        server.listen(PORT);
    })
    .catch(error => {
        logger.error('Unable to connect to the database: ', error);
        throw error;
    });

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    throw error;
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    logger.info(`Listening on port ${PORT}.`);
}
