import { h, Component } from 'preact';

import './header.css';

export default class Header extends Component {
    /*constructor(){
        super();
        console.log(this)

    }*/



    render() {
        const props = this.props;
        console.log(props);

        return (
            <header class="header">
                <nav className={'navigation'}>
                    <a onClick={_=>props.handleHeaderChange('in')} className='navigation__item navigation__item_active'>In Office</a>
                    <a  onClick={_=>props.handleHeaderChange('out')} className='navigation__item'>Out of Office</a>
                </nav>
            </header>
        );
    }
}
