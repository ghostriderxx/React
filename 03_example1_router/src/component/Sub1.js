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
const { TextArea } = Input;

class Sub1 extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {yzList, selectedRowIndex} = this.props.yzMng;

        return <div>
            医嘱描述：
            <TextArea rows={6} value={yzList[selectedRowIndex].yzms} disabled={true}/>
        </div>
    }
}

export default connect(
    ({yzMng}) => ({yzMng}),
    (dispatch) => ({dispatch})
)(Form.create()(Sub1));