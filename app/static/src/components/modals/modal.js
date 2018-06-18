import React, { Component } from 'react';

import './modal.css';

export default class Modal extends Component {
    back(e) {
        const { history } = this.props;
        e.stopPropagation();
        history.goBack();
    }

    render() {
        return (
            <div className="modal">
                <div className="modal__background" onClick={e => this.back(e)} />
                <div className="modal__foreground">Employee check in/check out history ({ this.props.match.params.id })</div>
            </div>
        );
    }
}
