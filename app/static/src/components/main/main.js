import { h, Component } from 'preact';

import EmployeesList from './../employeeList/employeesList';

import './main.css';

export default class Main extends Component {
    state = {
        sortBy: "fullName" 
    }

    handleSortChange = (sort) => {
        this.setState({
            sortBy: sort
        });
    }

    render(props, state) { 
        props.employees.sort((a, b) => {
            if(state.sortBy == "lastStatusChange") b = [a, a = b][0];
            return a[state.sortBy] > b[state.sortBy] ? 1 : a[state.sortBy] == b[state.sortBy] ? 0 : -1;
        });
        
        return (
            <main>
                <select onChange={(e) => this.handleSortChange(e.target.value)}>
                    <option value="fullName">Name</option>
                    <option value="lastStatusChange">Last status</option>
                </select>
                <EmployeesList employees={props.employees}/>
            </main>
        );
    }
}
