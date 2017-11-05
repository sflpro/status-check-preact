import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import './header.css';

class Header extends Component {
    render() {
        const { filter, onFilterChange } = this.props;
        return (
            <header className="header">
                <nav className="navigation" id="navigation">
                    <NavLink to="/in" className="navigation__item" activeClassName="navigation__item_active">In office</NavLink>
                    <NavLink to="/out" className="navigation__item" activeClassName="navigation__item_active">Out of office</NavLink>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);
