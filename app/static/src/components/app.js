import { h, Component } from 'preact';

import Filter from "./filter/filter";
import Sort from "./sort/sort";
import EmployeesList from './employeeList/employeesList';
import Loading from "./loading/loading";
import Notification from "./../services/notification";

const sortBy = {
    FULL_NAME: 'fullName',
    LAST_STATUS_CHANGE: 'lastStatusChange',
};

const filterBy = {
    IN: 'in',
    OUT: 'out',
};

const NotificationClass = new Notification();

export default class App extends Component {
    constructor() {
        super();

        this.setState({
            filter: filterBy.IN,
            sort: sortBy.FULL_NAME,
            employees: null,
            swSupport: null,
        });

        this.getEmployeesList().then(employees => this.setState({ employees }));
        NotificationClass.registerServiceWorker((support, status, sub) => {
            if (status) {
                this.updateEmployeesList(sub);
            }

            this.setState({ swSupport: support });
        });
    }

    getEmployeesList = () => {
        return fetch('api/staff')
            .then(res => res.json())
            .catch((error => console.log(error)));
    }

    getSubscribers = (subscription) => {
        return fetch(`api/subscriptions?key=${subscription}`).then((res) => {
            const { employees } = this.state;
            return res.json().then((subscribers) => {
                return employees.map((empl) => {
                    if (subscribers.indexOf(empl.id) !== -1) {
                        empl.subscribed = true;
                    }
                    return empl;
                });
            }, () => (employees));
        });
    }

    setSubscribers = (subscribers, subscription) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return fetch('api/subscriptions', {
            method: 'POST',
            headers,
            body: JSON.stringify({ key: subscription, value: subscribers }),
        });
    }

    handleSubscribe = (id) => {
        NotificationClass.subscribe((status, sub) => {
            if (status) {
                this.updateSubscribers(sub, id).then(() => this.updateEmployeesList(sub));
            } else {
                alert("You need to open permission.");
            }
        });
    }

    filterEmployeesList = (filter, sort) => {
        return this.state.employees.filter(e => e.status === filter).sort((a, b) => {
            if (sort === sortBy.LAST_STATUS_CHANGE) {
                [a, b] = [b, a];
            }
            return a[sort] > b[sort] ? 1 : (a[sort] === b[sort] ? 0 : -1);
        });
    }

    updateSubscribers = (subscription, id) => {
        const subscribers = [];
        const { employees } = this.state;
        for (let index = 0; index < employees.length; index++) {
            if (employees[index].id === id) {
                employees[index].subscribed = !employees[index].subscribed;
            }
            if (employees[index].subscribed) {
                subscribers.push(employees[index].id);
            }
        }
        return this.setSubscribers(subscribers, subscription);
    }

    updateEmployeesList = (sub) => {
        return this.getSubscribers(sub).then((employees) => {
            console.log(employees);
            this.setState({ employees });
        });
    }

    handleStatusChange = (filter) => {
        this.setState({
            filter,
        });
    };

    handleSortChange = (sort) => {
        this.setState({
            sort,
        });
    };

    render({}, {
        filter, sort, employees, swSupport,
    }) {
        return (
            <div>
                {employees && (
                    <div>
                        <header class="header">
                            <Filter filter={filter} onStatusChange={f => this.handleStatusChange(f)} />
                            <Sort sort={sort} onSortChange={s => this.handleSortChange(s)} />
                        </header>
                        <div class="clear">{}</div>
                        <EmployeesList employees={this.filterEmployeesList(filter, sort)} swSupport={swSupport} onSubscribe={id => this.handleSubscribe(id)} />
                    </div>
                )}
                {!employees && (<Loading />)}
            </div>
        );
    }
}
