import React,{ Component } from 'react';

import {EMPTY_AVATAR} from "../../../config";

export default class Image extends Component {
    constructor(){
        super();
        this.state={}
    }
    handleError = () => {
        if (this.state.src !== EMPTY_AVATAR) {
            this.setState({ src: EMPTY_AVATAR });
        }
    }
    render() {
        const src =this.props.src;
        return (
            <img onError={this.handleError} className="employee__avatar" src={this.state.src || src} alt="" />
        );
    }
}
