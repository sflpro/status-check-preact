import {h, Component} from 'preact';

import Header from "./header/header";
import Main from "./main/main";
import Sort from "./sort/sort";
import Loading from "./loading/loading";
import Notification from "./../services/notification";

//import StaffService from "./../services/staffService";

//const requests = StaffService.getInstance() ;
const NotificationClass = new Notification();

const sortBy = {
	FULL_NAME: 'fullName',
	LAST_STATUS_CHANGE: 'lastStatusChange'
};

const filterBy = {
	IN: 'in',
	OUT: 'out'
};

export default class App extends Component {
	constructor() {
		super();


		this.setState({
			currentFilter: filterBy.IN,
			currentSort: sortBy.FULL_NAME,
			employees: [],

			swSupport: null,
			swRegistration: null,
		});

		this.getEmployeesList().then(employees => {
			this.setState({employees});
			NotificationClass.registerServiceWorker((support, status, sub) => {
				if(status){
					this.updateStatus(support, sub);
				}

				this.setState({swSupport: support});
			});
		});

	}

	updateStatus = (support, subscription) => {
		this.getSubscribers(subscription).then(employees => {
			console.log(employees);
			this.setState({employees})
		});
	}

	updateSubscription = (subscription, id) => {
		const subscribers = [];
		const employees = this.state.employees;
		for(let index = 0; index < employees.length; index++){
			if(employees[index].id == id){
				employees[index].subscribed = !employees[index].subscribed || true;
			}
			if(employees[index].subscribed){
				subscribers.push(employees[index].id);
			}
		}

		this.setSubscribers(subscribers, subscription)
			//.then();
	}


	handleSubscribe = (id) => {
		NotificationClass.subscribe((status, sub) => {
			if(status){
				this.updateSubscription(sub, id);
			} else {
				alert("You need to open permission.");
			}
		});
	}

	getSubscribers = (subscription) => {
		 return fetch("api/subscriptions?key=" + subscription).then(res => {
			console.log(res);
			//console.log(res.json());
			let subscribers = [199];  //TODO
			const employees = this.state.employees;
			for (let index = 0; index < employees.length; index++) {
				if (subscribers.indexOf(employees[index].id) != -1) {
					employees[index].subscribed = true;
				}
			}

			return employees;
		})
			//.catch(err => console.log(err));
	}

	setSubscribers = (subscribers, subscription) => {
		console.log(subscription);
		console.log(subscribers);
		return fetch('api/subscriptions', {
			method: 'POST',
			body: JSON.stringify({key:subscription, value:subscribers})
		}).then(res => console.log(res));
	}


	getEmployeesList = () => {
		return fetch('api/staff')
			.then(res => res.json())
			//.catch(err => console.log(err));
	}

	/*    getEmployeesList = async () => {
            const res = await fetch('api/staff');
            const employees = await res.json();

            this.setState({employees});
        }*/

	filterAndSortEmployeesList = (filter, sort) => {
		const employees = this.state.employees.filter(e => e.status === filter);
		employees.sort((a, b) => {
			if (sort === "lastStatusChange") b = [a, a = b][0];
			return a[sort] > b[sort] ? 1 : a[sort] === b[sort] ? 0 : -1;
		});

		return employees;
	}


	handleStatusChange = (filter) => {
		this.setState({
			currentFilter: filter
		});
	};

	handleSortChange = (sort) => {
		this.setState({
			currentSort: sort
		});
	};

	render({}, {currentFilter, currentSort, employees, swSupport}) {
		console.log(employees);
		return (
			<div>
				{employees.length > 0 && (
					<div>
						<Header currentFilter={currentFilter} onStatusChange={(f) => this.handleStatusChange(f)}/>
						<Sort onSortChange={(s) => this.handleSortChange(s)}/>
						<Main employees={this.filterAndSortEmployeesList(currentFilter, currentSort)}
							  swSupport={swSupport} onSubscribe={(id) => this.handleSubscribe(id)}/>
					</div>
				)}
				{employees.length == 0 && (<Loading/>)}
			</div>
		);
	}
}
