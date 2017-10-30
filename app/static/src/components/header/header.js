import { h, Component } from 'preact';

import './header.css';

export default class Header extends Component {
    render({ currentFilter, onStatusChange }) {
        return (
            <header class="header">
                <nav class="navigation" id="navigation">
                    <button class={`navigation__item ${(currentFilter === 'in' ? 'navigation__item_active' : '')}`} onClick={() => onStatusChange('in')} >
                        In office
                    </button>
                    <button class={`navigation__item ${(currentFilter === 'out' ? 'navigation__item_active' : '')}`} onClick={() => onStatusChange('out')}>
                        Out of office
                    </button>
                </nav>
            </header>
        );
    }
}
