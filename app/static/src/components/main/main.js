import {h, Component} from 'preact';

import EmployeesList from './../employeeList/employeesList';

import './main.css';

export default class Main extends Component {
    render( {employees, onSubscribe} ) {
        return (
            <EmployeesList employees={employees} onSubscribe={onSubscribe} />
        );
    }
}
