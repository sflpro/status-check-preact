const express = require('express');
const compression = require('compression');
const redis = require('redis');
const client = redis.createClient('6379', 'redis');

const app = express();

app.use(compression());

function getEmployees() {
    return new Promise((resolve, reject) => {
        client.get('employees', (error, employees) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(employees || []);
        });
    });
}

app.get('/api/staff', async (req, res, next) => {
    try {
        res.end(await getEmployees());
    } catch (e) {
        res.end('something went wrong: \n', JSON.stringify(e));
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${(process.env.PORT || 8080)}`);
});
