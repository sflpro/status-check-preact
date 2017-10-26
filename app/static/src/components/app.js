import {h, Component} from 'preact';

import Header from "./header/header";
import Main from "./main/main";
import Sort from "./sort/sort";
import Loading from "./loading/loading";


import StaffService from "./../services/staffService";

const requests = StaffService.getInstance() ;
const sortBy = {
    FULL_NAME: 'fullName',
    LAST_STATUS_CHANGE: 'lastStatusChange'
};

const filterBy = {
    IN: 'in',
    OUT: 'out'
};

export default class App extends Component {


    constructor(){
        super();
        this.state = {
            employees: null,
            filteredEmployees:[],
            currentFilter: filterBy.IN,
            currentSort: sortBy.FULL_NAME,
        };

        this.updateEmployees();
    }

    updateEmployees(){
        return fetch('api/staff').then(res=>{
            return res.json().then(emp=>{
                this.filterEmployees(undefined,undefined,emp);
            });
        });
    }

    handleStatusChange = (filter) => {
        this.filterEmployees(this.state.currentSort,filter);
    };

    filterEmployees(sort =this.state.currentSort,filter=this.state.currentFilter,employees=this.state.employees){
        const filteredEmployees = employees.filter(e => e.status === filter);
        filteredEmployees.sort((a, b) => {
            if (sort === "lastStatusChange") b = [a, a = b][0];
            return a[sort] > b[sort] ? 1 : a[sort] === b[sort] ? 0 : -1;
        });
        this.setState({filteredEmployees:filteredEmployees,employees:employees,currentFilter:filter,currentSort:sort})
    }
    handleSortChange = (sort) => {
        this.filterEmployees(sort,this.state.currentFilter);
    };

    render(props, state) {
        return (
            <div>
                {state.employees&&(
                    <div>
                        <Header currentFilter={state.currentFilter} onStatusChange={this.handleStatusChange}/>
                        <Sort currentSort={state.currentSort} onSortChange={this.handleSortChange}/>
                        <Main  employees={state.filteredEmployees}/>
                    </div>
                    )}
                {state.employees === null && (<Loading />)}
            </div>
        );
    }
}
