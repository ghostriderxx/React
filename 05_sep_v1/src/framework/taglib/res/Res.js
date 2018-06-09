import PropTypes from 'prop-types';

import React from 'react';

/////////////////////////////////////////////////////////////////////////////
// AntDesign
//
import { Modal, Button } from 'antd';

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//

export default class Res extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Modal
                title={this.props.title}
                width={this.props.width}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                {...this.props}
            >
            </Modal>
        )
    }
}