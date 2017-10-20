import { h, Component } from 'preact';

import EmployeesList from './../employeeList/EmployeesList';

import './main.css';

export default class Main extends Component {
    constructor(){
        super();
        this.state.sortBy = 'fullName';
    }

    render(props) {
      
        console.log('rendering sort');
        const handleSortChange=(ev)=>{
            console.log(ev);
            this.setState({sortBy:ev.target.value});
        };
        const  sortBy = this.state.sortBy;
        const list = this.props.employees.sort((a,b)=>{
            return a[sortBy]>b[sortBy]
        });


        return (
            <div>
                <div>
                    <select onChange={handleSortChange}>
                        <option  value={'fullName'}>Name</option>
                        <option  value={'lastStatusChange'}>Last status</option>
                    </select>
                </div>
                <div>
                    <EmployeesList list={list}/>
                </div>

            </div>

        );
    }
}
