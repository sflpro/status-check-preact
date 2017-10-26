import {h, Component} from 'preact';

import './header.css';

export default class Header extends Component {
    render({ currentFilter,onStatusChange, }) {
        return (
            <header class="header">
                <nav class="navigation" id="navigation">
                    <a class={'navigation__item ' + (currentFilter === 'in' ? 'navigation__item_active' : '')}
                       href="#" onClick={() => onStatusChange('in')}>In office</a>
                    <a class={'navigation__item ' + (currentFilter

                    === 'out' ? 'navigation__item_active' : '')}
                       href="#" onClick={() => onStatusChange('out')}>Out of office</a>
                </nav>
            </header>
        );
    }
}
