import {h, Component} from 'preact';

import Header from "./header/header";
import Main from "./main/main";

import StaffService from "./../services/staffService";

export default class App extends Component {
    state = {
        status: 'in',
        employees: {
            loaded: false,
            list: []
        },
    };


    handleStatusChange = (status) => {
        this.setState({
            status: status
        });
    };

    render(props, state) {
        if (!state.employees.loaded) {
            StaffService.get().then(employees => {
                this.setState({employees: {list: employees, loaded: true}})
            });
            return (
                <div>Loading ...</div>
            );
        }
        const employees = state.employees.list.filter(e => e.status === state.status);
        return (
            <div>
                <Header status={state.status} onStatusChange={this.handleStatusChange}/>
                <Main employees={employees}/>
            </div>
        );
    }


}
