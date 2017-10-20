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
        const employees = props.employees.sort((a,b) => {
            return a[state.sortBy]>b[state.sortBy]
        });

        return (
            <main>
                <select onChange={(e) => this.handleSortChange(e.target.value)}>
                    <option value="fullName">Name</option>
                    <option value="lastStatusChange">Last status</option>
                </select>
                <div>
                    <EmployeesList employees={employees}/>
                </div>
            </main>
        );
    }
}
