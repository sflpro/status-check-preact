import React, { Component } from 'react';

import Header from "./header/header";
import Employees from './employees/employees';

export default class App extends Component {
    render() {
        const { match: { params }} = this.props;
        return (
            <div>
                <Header />
                <Employees filter={params.filter} />
            </div>
        );
    }
}
