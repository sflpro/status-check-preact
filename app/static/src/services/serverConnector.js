export default class ServerConnector {
    constructor() {
        this.path = "";
    }

    send(req) {
        const path = this.path + req.path;

        const headersObj = Object.assign({
            'content-type': 'text/plain',
        }, req.headers);

        const headers = new Headers(headersObj);

        const options = Object.assign({
            method: 'POST',
        }, req.options);

        options.headers = headers;
        const request = new Request(path, options);
        return fetch(request).then(res => res.json());
    }
}
