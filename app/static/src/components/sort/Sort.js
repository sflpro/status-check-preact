import { h, Component } from 'preact';

import EmployeesList from './../employeeList/EmployeesList';

import './sort.css';

export default class Sort extends Component {
    constructor(){
        super();
        this.state.sortBy = 'fullName';
    }

    render() {
        const props = this.props;
        console.log('rendering sort');
        const handleSortChange=(ev)=>{
            console.log(ev);
            //props.handleSortChange(ev.target.value);
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
