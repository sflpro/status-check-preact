import { h, Component } from 'preact';

import './employeesList.css';

export default class EmployeesList extends Component {
    render(props) {
        console.log(props.employees);
        return (
            <div>
                {props.employees.map((employee) =>
                    <article class="employee">
                        <div class="employee__wrapper">
                            <img class="employee__avatar" src={'http://status.sflpro.com/assets/avatars/'+employee.fullName.replace(" ","-")+"-50x50.jpg"}/>
                            <h2 class="employee__name">{employee.fullName}</h2>
                            <p class="employee__date">{employee.lastStatusChange}</p>
                            <button class="employee__subscribe">
                                s
                            </button>
                        </div>
                    </article>
                )}
            </div>
        );
    }
}
