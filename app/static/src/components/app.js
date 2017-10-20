import { h, Component } from 'preact';

import Header from "./header/header";
import Main from "./main/main";

export default class App extends Component{
    state = {
        status: 'in',
        employees: []
    }

    handleStatusChange = (status) => {
        this.setState({
            status: status
        });
    }

    render(props, state){
        console.log(state);
        const employees = state.employees.filter(e => e.status == state.status);
        return(
            <div>
                <Header status={state.status} onStatusChange={this.handleStatusChange} />
                <Main employees={employees} sortBy={state.sortBy} onSortChange={this.handleSortChange} />
            </div>
        )
    }
}