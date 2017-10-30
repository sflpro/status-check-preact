import ServerConnector from "./serverConnector";

export default class StaffService extends ServerConnector {
    constructor() {
        super();
        this.path = "api/staff";
    }

    get() {
        // const headers = new Headers();
        const options = {
            method: 'GET',
            cache: 'default',
        };
        return this.send({ path: '', options, headers: { 'content-type': 'application/json' } });
    }
}