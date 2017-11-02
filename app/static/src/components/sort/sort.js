import { h, Component } from 'preact';

import { MenuItem } from 'material-ui/Menu';
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './sort.css';

export default class Main extends Component {
    render({ sort, onSortChange }) {
        console.log(sort);
        return (
            <div class="sort">
                <span for="" class="sort__label">Sort By: </span>
                <div class="sort__element">
                    <MuiThemeProvider class={{ }}>
                        <SelectField labelStyle={{ color: '#505b69' }} selectedMenuItemStyle={{ color: '#ffc80a' }} menuItemStyle={{ color: '#505b69' }} iconStyle={{ fill: '#ffc80a', paddingLeft: '15px', fontWeight: '800' }} underlineStyle={{ borderBottom: '1px solid #d2708e', color: '#d2708e' }} value={sort} onChange={(e, index, value) => onSortChange(value)} >
                            <MenuItem value="fullName" primaryText="Name" />
                            <MenuItem value="lastStatusChange" primaryText="Last Status" />
                        </SelectField>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}
