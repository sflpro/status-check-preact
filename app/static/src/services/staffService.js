import ServerConnector from "./serverConnector";
let instance = null;
export default class StaffService extends ServerConnector{
    constructor(){
        super();
        this.path = "api/staff"
    }
    static getInstance() {
        if (!instance) {
            instance = new StaffService();
        }
        return instance;
    }

    get() {
        const headers = new Headers();
        const options ={
            method:'GET',
            cache:'default'
        };
        return this.send({path:'',options:options,headers:{'content-type':'application/json'}});
    }

}