import { h, Component } from 'preact';

import './employeesList.css';

export default class EmployeesList extends Component {
    /*constructor(){
        super();
        console.log(this)

    }*/



    render() {
        const props = this.props;
        const list = props.list.map((employee)=>
            <article className={'employee'}>
                <div className={'employee__wrapper'}>
                    <img className={'employee__avatar'} src={''}/>
                    <h2 className={'employee__name'}>{employee.fullName}</h2>
                    <p className={'employee__date'}>{employee.lastStatusChange}</p>
                    <button className={'employee__subscribe'}>
                        s
                    </button>
                </div>
            </article>
        );

        return (
            <div>
                {list}
            </div>
        );
    }
}
