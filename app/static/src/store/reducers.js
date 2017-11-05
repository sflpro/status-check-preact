import { combineReducers } from 'redux';
import { CHANGE_FILTER, CHANGE_SORT_OPTION, RECEIVE_EMPLOYEES, FILTERS, SORT_OPTIONS } from './actions';

function filter(state = FILTERS.IN, action) {
    switch(action.type) {
        case CHANGE_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function sortOption(state = SORT_OPTIONS.LAST_ACTION, action) {
    switch(action.type) {
        case CHANGE_SORT_OPTION:
            return action.sortBy;
        default:
            return state;
    }
}

function employees(state = [], action) {
    switch (action.type) {
        case RECEIVE_EMPLOYEES:
            return action.employees;
        default:
            return state;
    }
}

export default combineReducers({
    filter,
    sortOption,
    employees
});
