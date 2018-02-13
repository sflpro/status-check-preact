import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { sortEmployees } from '../../store/actions';

import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.sortOptionChanged(event.target.value);
    }

    render() {
        const { filter, onFilterChange } = this.props;
        return (
            <header className="header">
                <nav className="navigation" id="navigation">
                    <NavLink to="/in" className="navigation__item" activeClassName="navigation__item_active">In office</NavLink>
                    <NavLink to="/out" className="navigation__item" activeClassName="navigation__item_active">Out of office</NavLink>
                    <select className="filterBlock" value={this.props.sortOption} onChange={this.handleChange}>
                        <option value="none">None</option>
                        <option value="name">Filter by name</option>
                        <option value="lastStatusChange">Filter by date</option>
                    </select>
                </nav>
            </header>
        );
    }
}

function mapProperties(state) {
    return {
        sortOption: state.sortEmployeesByOption.sortOption
    };
}

function mapCallbacks(dispatch) {
    return {
        sortOptionChanged: sortOption => {
            dispatch(sortEmployees(sortOption))
        }
    };
}

export default withRouter(connect(
    mapProperties,
    mapCallbacks
)(Header));