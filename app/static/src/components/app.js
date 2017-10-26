import {h, Component} from 'preact';

import Header from "./header/header";
import Main from "./main/main";
import Sort from "./sort/sort";
import Loading from "./loading/loading";
//import StaffService from "./../services/staffService";

//const requests = StaffService.getInstance() ;

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
            currentFilter: filterBy.IN,
            currentSort: sortBy.FULL_NAME,
            employees: [],
        });

        this.getEmployeesList();
    }


    getEmployeesList = () => {
        fetch('api/staff')
            .then(res => res.json())
            .then(employees => this.setState({ employees }))
            .catch(error => this.setState({ error }));
    }

/*    getEmployeesList = async () => {
        const res = await fetch('api/staff');
        const employees = await res.json();

        this.setState({employees});
    }*/

    filterAndSortEmployeesList = (filter, sort) => {
        const employees = this.state.employees.filter(e => e.status === filter);
        employees.sort((a, b) => {
            if (sort === "lastStatusChange") b = [a, a = b][0];
            return a[sort] > b[sort] ? 1 : a[sort] === b[sort] ? 0 : -1;
        });

        return employees;
    }


    handleStatusChange = (filter) => {
        this.setState({
            currentFilter: filter
        });
    };

    handleSortChange = (sort) => {
        this.setState({
            currentSort: sort
        });
    };

    render({}, {currentFilter, currentSort, employees}) {
        return (
            <div>
                {employees.length > 0 && (
                   <div>
                       <Header currentFilter={currentFilter} onStatusChange={(f) => this.handleStatusChange(f)}/>
                       <Sort onSortChange={(s) => this.handleSortChange(s)}/>
                       <Main employees={this.filterAndSortEmployeesList(currentFilter, currentSort)}/>
                   </div>
                )}
                {employees.length == 0 && (<Loading />)}
            </div>
        );
    }
}
