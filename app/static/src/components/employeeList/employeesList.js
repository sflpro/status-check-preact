import { h, Component } from 'preact';

import { format, parse, addMilliseconds } from 'date-fns';

import { sflAvatarUrl } from '../../../config';

import Image from './../image/image';

import './employeesList.css';

const icon = {
    CHECKMARK: 'checkmark',
    BELL: 'bell',
};

export default class EmployeesList extends Component {
    render({ employees, onSubscribe }) {
        return (
            <div>
                {employees.map(employee => (
                    <article class="employee">
                        <div class="employee__wrapper">
                            <Image src={`${sflAvatarUrl}${employee.fullName.replace(" ", "-")}-50x50.jpg`} />
                            <h2 class="employee__name">
                                {employee.fullName}
                            </h2>
                            <p class="employee__date">
                                {format(addMilliseconds(parse(employee.lastStatusChange), -4 * 60 * 60 * 1000), 'DD MMMM YYYY HH:mm:ss')}
                            </p>
                            <button class="employee__subscribe" onClick={() => onSubscribe(employee.id)}>
                                <svg class={`icon icon-${employee.subscribed ? icon.CHECKMARK : icon.BELL}`}>
                                    <use xlinkHref={`#icon-${employee.subscribed ? icon.CHECKMARK : icon.BELL}`}>{}</use>
                                </svg>
                            </button>
                        </div>
                    </article>
                ))}
                <div class="clear">{}</div>
            </div>
        );
    }
}
