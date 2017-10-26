import {h, Component} from 'preact';

export default class Main extends Component {
    render( {onSortChange} ) {
        return (
            <select onChange={(e) => onSortChange(e.target.value)}>
                <option value="fullName">Name</option>
                <option value="lastStatusChange">Last status</option>
            </select>
        );
    }
}
