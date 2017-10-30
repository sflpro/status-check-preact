import { h, Component } from 'preact';

import Header from "./header/header";
import Main from "./main/main";
import Sort from "./sort/sort";
import Loading from "./loading/loading";

const sortBy = {
    FULL_NAME: 'fullName',
    LAST_STATUS_CHANGE: 'lastStatusChange'
};

const filterBy = {
    IN: 'in',
    OUT: 'out'
};

export default class App extends Component {
    constructor() {
        super();

        this.setState({
            filter: filterBy.IN,
            sort: sortBy.FULL_NAME,
            employees: []
        });

        this.getEmployeesList().then(employees => this.setState({ employees }));
    }

    getEmployeesList = () => {
        fetch('api/staff')
            .then(res => res.json())
            .catch((error => console.log(error)));
    }

    filterAndSortEmployeesList = (filter, sort) => {
        const employees = this.state.employees.filter(e => e.status === filter);
        employees.sort((a, b) => {
            if (sort === sortBy.LAST_STATUS_CHANGE) {
                // b = [a, a = b][0]; destructuring
                [a, b] = [b, a];
            }
            return a[sort] > b[sort] ? 1 : (a[sort] === b[sort] ? 0 : -1);
        });

        return employees;
    }

    handleStatusChange = (filter) => {
        this.setState({
            filter
        });
    };

    handleSortChange = (sort) => {
        this.setState({
            sort
        });
    };

    render({}, { filter, sort, employees }) {
        return (
            <div>
                {employees.length > 0 && (
                    <div>
                        <Header filter={filter} onStatusChange={f => this.handleStatusChange(f)} />
                        <Sort onSortChange={s => this.handleSortChange(s)} />
                        <Main employees={this.filterAndSortEmployeesList(filter, sort)} />
                    </div>
                )}
                {employees.length === 0 && (<Loading />)}
            </div>
        );
    }
}
