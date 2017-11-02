import { h, Component } from 'preact';

import './filter.css';

export default class Filter extends Component {
    render({ filter, onStatusChange }) {
        return (
            <nav class="navigation" id="navigation">
                <a href="#in" class={`navigation__item ${(filter === 'in' ? 'navigation__item_active' : '')}`} onClick={() => onStatusChange('in')} >
                    In office
                </a>
                <a href="#out" class={`navigation__item ${(filter === 'out' ? 'navigation__item_active' : '')}`} onClick={() => onStatusChange('out')}>
                    Out of office
                </a>
            </nav>
        );
    }
}
