export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CHANGE_SORT_OPTION = 'CHANGE_SORT_OPTION';
export const RECEIVE_EMPLOYEES = 'RECEIVE_EMPLOYEES';
export const SORT_EMPLOYEES = 'SORT_EMPLOYEES';

export const FILTERS = { IN: 'IN', OUT: 'OUT' };
export const SORT_OPTIONS = { NAME: 'NAME', LAST_ACTION: 'LAST_ACTION' };

export function changeFilter(filter) {
    return {
        type: CHANGE_FILTER,
        filter
    }
}

export function receiveEmployees(employees) {
    return {
        type: RECEIVE_EMPLOYEES,
        employees
    }
}

export function sortEmployees(sortOption) {
    return {
        type: SORT_EMPLOYEES,
        sortOption
    }
}

export function fetchEmployees() {
    return dispatch => {
        return fetch(`${API_ENDPOINT}/staff`)
            .then(
                response => response.json(),
                error => console.error(error)
            )
            .then(json => {
                dispatch(receiveEmployees(json));
            })
    }
}
