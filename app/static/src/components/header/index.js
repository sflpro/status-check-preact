import { h, Component } from 'preact';

import './index.css';

export default class Header extends Component {
    render({ foo }) {
        return (
            <header class="header">{foo}</header>
        );
    }
}
