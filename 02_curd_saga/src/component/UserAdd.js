import React from "react"
import {connect} from "react-redux"

import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    Table,
    Row,
    Col,
    Modal,
} from 'antd';
import userMng from "../reducer/userMngReducer";

const FormItem = Form.Item;

class UserAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {loading} = this.props.userMng;

        return (
            <Modal
                title="新增用户"
                visible={true}
                onOk={this.handleOk}
                confirmLoading={loading}
                onCancel={this.handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}

export default connect(
    ({userMng}) => ({userMng}),
    (dispatch) => ({dispatch})
)(Form.create()(UserAdd));