const client = require('../redis');
const employees = require('../employees');
const webpush = require('web-push');

const { PUSH_PRIVATE, PUSH_PUBLIC } = process.env;

const endPoints = {};

client().hgetall("subscribers", (error, subscribers) => {
    if (subscribers) {
        for (const [key, value] of Object.entries(subscribers)) {
            for (const id of JSON.parse(value)) {
                if (!endPoints[id]) endPoints[id] = [];
                endPoints[id].push(key);
            }
        }
    }
});

module.exports = () => {
    let oldList = [];
    setInterval(async () => {
        try {
            const newList = await employees.fetch();
            if (oldList.length) {
                const ids = compareStatuses(oldList, newList);
                console.log(ids);
                for (const id of ids) {
                    sendPushNotification(id);
                }
            }
            client().set('employees', JSON.stringify(newList));
            oldList = newList;
            console.log('Refreshed the employees list');
        } catch (e) {
            console.log(`Unable to refresh the employees list ${e}`);
        }
    }, 10000);
};

function compareStatuses(oldEmployees, newEmployees) {
    const oldStatuses = {};
    const statusChangedEmployees = [];

    for (const employee of oldEmployees) {
        oldStatuses[employee.id] = employee.status;
    }

    for (const employee of newEmployees) {
        if (oldStatuses[employee.id] !== employee.status) {
            statusChangedEmployees.push(employee);
        }
    }

    return statusChangedEmployees;
}

function sendPushNotification(employee) {
    webpush.setVapidDetails(
        'mailto:example@yourdomain.org',
        PUSH_PUBLIC,
        PUSH_PRIVATE,
    );

    // This is the same output of calling JSON.stringify on a PushSubscription (client.js)
    if (endPoints[employee.id] !== undefined) {
        for (const endPoint of endPoints[employee.id]) {
            const pushSubscription = JSON.parse(endPoint);
            webpush.sendNotification(pushSubscription, `${employee.fullName} ' has checked ' ${employee.status}`);
        }
    }
}
