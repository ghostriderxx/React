import PropTypes from 'prop-types';

import React from 'react';

/////////////////////////////////////////////////////////////////////////////
// AntDesign
//
import { Modal, Button } from 'antd';

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
export default class Sheet extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}