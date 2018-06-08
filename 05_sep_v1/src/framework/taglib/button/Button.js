import PropTypes from 'prop-types';

import React from 'react';

import {Button as AntdButton} from "antd";

export default class Button extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return  <AntdButton {...this.props}
                            style={{
                                marginLeft:5
                            }}></AntdButton>
    }
}