import { h, Component } from 'preact';

import './header.css';

export default class Header extends Component {
    render(props) {
        return (
            <header class="header">
				<nav class="navigation" id="navigation">
                	<a class = {'navigation__item ' + (this.props.status == 'in' ? 'navigation__item_active': '') } href="#" onClick={() => props.onStatusChange('in')}>In office</a>
               	 	<a class = {'navigation__item ' + (this.props.status == 'out' ? 'navigation__item_active': '') } href="#" onClick={() => props.onStatusChange('out')}>Out of office</a>
            	</nav>
			</header>
        );
    }
}
