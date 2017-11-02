import { h, Component } from 'preact';

import { EMPTY_AVATAR } from './../../../config';

export default class Image extends Component {
    handleError = () => {
        if (this.state.src !== EMPTY_AVATAR) {
            this.setState({ src: EMPTY_AVATAR });
        }
    }
    render({ src }) {
        return (
            <img onError={this.handleError} class="employee__avatar" src={this.state.src || src} alt="" />
        );
    }
}
