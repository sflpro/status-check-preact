import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import './header.css';

const Header = () => (
    <header className="header">
        <nav className="navigation" id="navigation">
            <NavLink to="/in" className="navigation__item" activeClassName="navigation__item_active">In office</NavLink>
            <NavLink to="/out" className="navigation__item" activeClassName="navigation__item_active">Out of office</NavLink>
        </nav>
    </header>
);

export default withRouter(Header);
