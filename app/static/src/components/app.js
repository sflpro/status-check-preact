import {h, Component} from 'preact';

import Header from "./header/header";
import Main from "./main/main";


import StaffService from "./../services/staffService";

const requests = StaffService.getInstance() ;
const sortBy = {
    FULLNAME: 'fullName',
    LASTSTATUSCHANGE: 'lastStatusChange'
};

const filterBy = {
    IN: 'in',
    OUT: 'out'
};

export default class App extends Component {

    state = {
        status: 'in',
        employees: {
            loaded: false,
            list: []
        },
        current_filter: filterBy.IN,
        current_sort: sortBy.FULLNAME,
    };


    handleStatusChange = (filter) => {
        this.setState({
            current_filter: filter
        });
    };

    handleSortChange = (sort) => {
        this.setState({
            current_sort: sort
        });
    };

    render(props, state) {
        if (!state.employees.loaded) {
            requests.get().then(employees => {
                this.setState({employees: {list: employees, loaded: true}})
            });
            return (
                <div>Loading ...</div>
            );
        }
        const employees = state.employees.list.filter(e => e.status === state.current_filter);
        employees.sort((a, b) => {
            if (state.current_sort === "lastStatusChange") b = [a, a = b][0];
            return a[state.current_sort] > b[state.current_sort] ? 1 : a[state.current_sort] === b[state.current_sort] ? 0 : -1;
        });
        
        return (
            <div>
                <Header current_filter={state.current_filter} onStatusChange={this.handleStatusChange}/>
                <Main current_sort={state.current_sort} onSortChange={this.handleSortChange} employees={employees}/>
            </div>
        );
    }
}
