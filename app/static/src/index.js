import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './store/reducers';
import { fetchEmployees } from './store/actions';

import App from './components/app';

import './index.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

store.dispatch(fetchEmployees());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
