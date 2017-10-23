import {h, Component} from 'preact';

import EmployeesList from './../employeeList/employeesList';

import './main.css';

export default class Main extends Component {
    render(props, state) {
        return (
            <main>
                <select onChange={(e) => props.onSortChange(e.target.value)}>
                    <option value="fullName">Name</option>
                    <option value="lastStatusChange">Last status</option>
                </select>
                <EmployeesList employees={props.employees}/>
            </main>
        );
    }
}
