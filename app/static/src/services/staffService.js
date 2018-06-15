import ServerConnector from './serverConnector';

export default class StaffService extends ServerConnector {
  constructor(path = 'api/staff') {
    super(path);
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
