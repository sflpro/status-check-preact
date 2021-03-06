import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, parse, addMilliseconds } from 'date-fns';

import './employees.css';
import { genEmployeeImgSrc, generateLinkTo } from '../helpers';

const Employees = (props) => {
    const { employees } = props;
    return (
        <div className="employees">
            {
                (employees.length > 0)
                    ? employees.map(employee => (
                        <article className="employee" key={employee.id}>
                            <Link className="employee__wrapper" to={generateLinkTo(employee.id)}>
                                <img className="employee__avatar" src={genEmployeeImgSrc(employee.fullName)} alt={employee.fullName} />
                                <h2 className="employee__name">
                                    {employee.fullName}
                                </h2>
                                <p className="employee__date">
                                    {
                                        employee.lastStatusChange
                                            ? format(addMilliseconds(parse(employee.lastStatusChange), -4 * 60 * 60 * 1000), 'DD MMMM YYYY HH:mm:ss')
                                            : 'long time ago'
                                    }
                                </p>
                            </Link>
                        </article>
                    ))
                    : (
                        <div className="employees__empty">
                            <p className="empty__status">Employees list is not available...</p>
                            <p className="empty__status"> Please try again </p>
                        </div>
                    )
            }
            <div className="clear" />
        </div>
    );
};

function filterEmployees(employees, filter) {
    if (employees.length > 0) {
        return employees.filter(employee => employee.status === filter.toLowerCase());
    }
    return employees;
}

function mapProperties(state, ownProps) {
    return {
        employees: filterEmployees(state.employees, ownProps.filter),
    };
}

export default connect(mapProperties)(Employees);
