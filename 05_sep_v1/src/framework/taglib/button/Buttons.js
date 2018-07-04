import PropTypes from 'prop-types';

import React from 'react';

import Button from "./Button"

export default class Buttons extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const align = this.props.align || "left";

        return <div {...this.props} style={{textAlign: align}}></div>
    }
}

Buttons.Button = Button;