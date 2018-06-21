/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React, Redux、Router
import React from "react"
import {connect} from "react-redux"
import {goBack} from "react-router-redux";

// ## antd
import {
    Form,
    Input,
    Modal,
} from 'antd';

/////////////////////////////////////////////////////////////////////////////
// UI
//
@Form.create()
@connect(({userAdd}) => ({userAdd}))
export default class UserAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    onOK() {
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

    onCancel() {
        this.props.dispatch(goBack());
    }

    render() {
        const loading = this.props.userAdd.loading;

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 4},
            },
            wrapperCol: {
                sm: {span: 20},
            },
        };

        return (
            <Modal title="新增用户" visible={true}
                   confirmLoading={loading}
                   okText={"确定"} cancelText={"取消"}
                   onOk={() => this.onOK()}
                   onCancel={() => this.onCancel()}
            >
                <Form>
                    <Form.Item label={"姓名"} {...formItemLayout}>
                        {
                            getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请输入姓名!',
                                }],
                            })(
                                <Input placeholder="姓名..."/>
                            )
                        }
                    </Form.Item>
                    <Form.Item label={"年龄"} {...formItemLayout}>
                        {
                            getFieldDecorator('age', {
                                rules: [{
                                    required: true, message: '请输入年龄!',
                                }],
                            })(
                                <Input type={"number"} placeholder="年龄..."/>
                            )
                        }
                    </Form.Item>
                    <Form.Item label={"住址"} {...formItemLayout}>
                        {
                            getFieldDecorator('address', {
                                rules: [{
                                    required: true, message: '请输入住址!',
                                }],
                            })(
                                <Input placeholder="住址..."/>
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}