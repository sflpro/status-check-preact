const client = require('../redis');

module.exports = (key) => {
    return new Promise((resolve, reject) => {
        client().hget("subscribers", key, (err, subscribers) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(subscribers);
        });
    });
};

