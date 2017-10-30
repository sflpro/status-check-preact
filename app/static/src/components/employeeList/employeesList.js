import { h, Component } from 'preact';

import { format, parse, addMilliseconds } from 'date-fns';

import './employeesList.css';

export default class EmployeesList extends Component {
    render({ employees }) {
        return (
            <div>
                {employees.map((employee) => (
                    <article class="employee">
                        <div class="employee__wrapper">
                            <img class="employee__avatar" src={`http://status.sflpro.com/assets/avatars/ ${employee.fullName.replace(" ", "-")} -50x50.jpg`} alt="" />
                            <h2 class="employee__name">
                                {employee.fullName}
                            </h2>
                            <p class="employee__date">
                                {format(addMilliseconds(parse(employee.lastStatusChange), -4 * 60 * 60 * 1000), 'DD MMMM YYYY HH:mm:ss')}
                            </p>
                            <button class="employee__subscribe">
                                s
                            </button>
                        </div>
                    </article>
                ))}
                <div class="clear">{}</div>
            </div>
        );
    }
}
