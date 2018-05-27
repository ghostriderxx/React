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

    addUser() {

        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {name, age, address} = values;

                this.props.dispatch({
                    type: "ADD_USER_REQUESTED",
                    payload: {name, age, address,}
                });
            }
        });

    }

    render() {

        const {loading} = this.props.userMng;

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <Modal
                title="新增用户"
                visible={true}
                confirmLoading={loading}
                onOk={() => {
                    this.addUser();
                    this.props.onOk();
                }}
                onCancel={() => this.props.onCancel()}
            >
                <Form>
                    <FormItem label={"姓名"}>
                        {
                            getFieldDecorator('name', {})(
                                <Input placeholder="姓名..."/>
                            )
                        }
                    </FormItem>

                    <FormItem label={"年龄"}>
                        {
                            getFieldDecorator('age', {})(
                                <Input placeholder="年龄..."/>
                            )
                        }
                    </FormItem>

                    <FormItem label={"住址"}>
                        {
                            getFieldDecorator('address', {})(
                                <Input placeholder="住址..."/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default connect(
    ({userMng}) => ({userMng}),
    (dispatch) => ({dispatch})
)(Form.create()(UserAdd));