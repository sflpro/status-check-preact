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
			accounts: [],
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
		this.getSubscribers(subscription);
	}

	updateSubscription = (subscription, id) => {
		const subscribers = [];
		const accounts = this.state.accounts;
		for(index = 0; index < accounts; index++){
			if(accounts[index].id == id){
				accounts[index].subscribed = !accounts[index].subscribed;
			}
			if(accounts[index].subscribed){
				subscribers.push(accounts[index].id);
			}
		}
		console.log(subscribers);
		//this.setSubscribers(subscribers, subscription)
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
		fetch("api/subscriptions?key=" + subscription).then(res => {
			console.log(res);
			const response = res.json().then( (subscribers) => {
					console.log(res);
					alert(res.status);

						const accounts = this.state.accounts;
						for (index = 0; index < accounts.length; index++) {
							if (subscribers.indexOf(accounts[index].id) != -1) {
								accounts[index].subscribed = true;
							}
						}
						return accounts;



				}, (err) => {
					console.log(err);
				}

			);


		})
			//.catch(err => console.log(err));
	}

	setSubscribers = (subscribers, subscription) => {

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
