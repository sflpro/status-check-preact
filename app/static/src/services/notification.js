/* global PUSH_KEY */
const applicationServerPublicKey = PUSH_KEY;
let isSubscribed = null;
let swRegistration = null;

export default class Notification {
    urlB64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    registerServiceWorker = (callback) => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.register('sw.js')
                .then((swReg) => {
                    console.log('Service Worker is registered', swReg);

                    swRegistration = swReg;
                    swRegistration.pushManager.getSubscription()
                        .then((subscription) => {
                            isSubscribed = !(subscription === null);
                            if (isSubscribed) {
                                callback(true, true, JSON.stringify(subscription));
                            } else {
                                callback(true, false, null);
                            }
                        });
                })
                .catch((error) => {
                    console.error('Unable to register service worker: ', error);
                });
        } else {
            console.warn('Push messaging is not supported');
            callback(false, false, null);
        }
    }

    subscribe = (callback) => {
        const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey,
        };

        swRegistration.pushManager.subscribe(subscribeOptions).then((subscription) => {
            isSubscribed = true;
            callback(true, JSON.stringify(subscription));
        }).catch((err) => {
            console.log('Failed to subscribe the user: ', err);
            callback(false, null);
        });
    }
}
