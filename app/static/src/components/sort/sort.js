import React from 'react';

const Main = ({ onSortChange }) => (
    <select onChange={e => onSortChange(e.target.value)}>
        <option value="fullName">Name</option>
        <option value="lastStatusChange">Last status</option>
    </select>
);

export default Main;
