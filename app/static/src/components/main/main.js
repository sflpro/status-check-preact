import {h, Component} from 'preact';

import EmployeesList from './../employeeList/employeesList';

import './main.css';

export default class Main extends Component {
    render( {employees} ) {
        return (
            <EmployeesList employees={employees} />
        );
    }
}
