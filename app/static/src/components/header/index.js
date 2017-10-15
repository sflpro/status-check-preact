import { h, Component } from 'preact';

import './index.css';

export default class Header extends Component {
    render({ foo }) {
        return (
            <div class="header">{foo}</div>
        );
    }
}
