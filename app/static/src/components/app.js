import { h, Component } from 'preact';

import Header from "./header/header";
import Sort from "./sort/sort";
import EmployeesList from './employeeList/employeesList';
import Loading from "./loading/loading";

const sortBy = {
    FULL_NAME: 'fullName',
    LAST_STATUS_CHANGE: 'lastStatusChange',
};

const filterBy = {
    IN: 'in',
    OUT: 'out',
};

export default class App extends Component {
    constructor() {
        super();

        this.setState({
            filter: filterBy.IN,
            sort: sortBy.FULL_NAME,
            employees: null,
        });

        this.getEmployeesList().then(employees => this.setState({ employees }));
    }

    getEmployeesList = () => {
        fetch('api/staff')
            .then(res => res.json())
            .catch((error => console.log(error)));
    }

    updateEmployeesList = (filter, sort) => {
        return this.state.employees.filter(e => e.status === filter).sort((a, b) => {
            if (sort === sortBy.LAST_STATUS_CHANGE) {
                [a, b] = [b, a];
            }
            return a[sort] > b[sort] ? 1 : (a[sort] === b[sort] ? 0 : -1);
        });
    }

    handleStatusChange = (filter) => {
        this.setState({
            filter,
        });
    };

    handleSortChange = (sort) => {
        this.setState({
            sort,
        });
    };

    render({}, { filter, sort, employees }) {
        return (
            <div>
                {employees && (
                    <div>
                        <Header filter={filter} onStatusChange={f => this.handleStatusChange(f)} />
                        <Sort onSortChange={s => this.handleSortChange(s)} />
                        <EmployeesList employees={this.updateEmployeesList(filter, sort)} />
                    </div>
                )}
                {!employees && (<Loading />)}
            </div>
        );
    }
}
