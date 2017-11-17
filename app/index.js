const express = require('express');
const compression = require('compression')
const client = require('./lib/redis');
const page = require('./lib/page');
const employees = require('./lib/employees');
const subscriptions = require('./lib/subscriptions');
const bodyParser = require('body-parser');

const app = express();

app.use(compression());

app.use('/static', express.static('public'));

app.use('/api', bodyParser.json());

app.get('/api/staff', async (req, res, next) => {
    try {
        res.end(await employees.list());
    } catch (e) {
        res.end('something went wrong: \n', JSON.stringify(e));
    }
});

app.get('/api/subscriptions', async (req, res, next) => {
    try {
        res.end(await subscriptions.get(req.query.key));
    } catch (e) {
        res.end('something went wrong: \n', JSON.stringify(e));
    }
});

app.post('/api/subscriptions', async (req, res, next) => {
    res.end(subscriptions.set(req.body.key, req.body.value));
});

app.use(async (req, res, next) => {
    res.end(page());
});

async function start() {
    const list = await employees.fetch();
    client().set('employees', JSON.stringify(list));
}

start()
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Listening on port ${(process.env.PORT || 8080)}`);
            subscriptions.watch();
        });
    })
    .catch((e) => {
        console.error('cannot start server: ', e);
    });
