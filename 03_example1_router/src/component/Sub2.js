import React from "react"
import {connect} from "react-redux"

// antd
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

const FormItem = Form.Item;

class Sub2 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return "HelloWorld 2!"
    }
}

export default connect(
    ({yzMng}) => ({yzMng}),
    (dispatch) => ({dispatch})
)(Form.create()(Sub2));