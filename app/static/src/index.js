import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './store/reducers';
import { fetchEmployees } from './store/actions';

let store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    )
);

import App from './components/app';

import './index.css';

store.dispatch(fetchEmployees());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/:filter" component={App} />
                <Redirect from="/" to="/in"/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
