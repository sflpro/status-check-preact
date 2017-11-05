import React, { Component } from 'react';
import { connect } from 'react-redux';

import { format, parse, addMilliseconds } from 'date-fns';

import { sflAvatarUrl } from '../../../config';

import './employees.css';

class Employees extends Component {
    render() {
        const { employees } = this.props;
        return (
            <div>
                {(employees.length > 0) && employees.map(employee => (
                    <article className="employee" key={employee.id}>
                        <div className="employee__wrapper">
                            <img className="employee__avatar" src={`${sflAvatarUrl}${employee.fullName.replace(" ", "-")}-50x50.jpg`} alt={employee.fullName} />
                            <h2 className="employee__name">
                                {employee.fullName}
                            </h2>
                            <p className="employee__date">
                                {format(addMilliseconds(parse(employee.lastStatusChange), -4 * 60 * 60 * 1000), 'DD MMMM YYYY HH:mm:ss')}
                            </p>
                            <button className="employee__subscribe">
                                s
                            </button>
                        </div>
                    </article>
                ))}
                <div className="clear"></div>
            </div>
        );
    }
}

function filterEmployees(employees, filter) {
    if (employees.length > 0) {
        return employees.filter(employee => {
            return employee.status === filter.toLowerCase();
        });
    }
    return employees;
}

function mapProperties(state, ownProps) {
    return {
        employees: filterEmployees(state.employees, ownProps.filter)
    }
}

export default connect(
    mapProperties
)(Employees);
