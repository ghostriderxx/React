import React from "react"
import {connect} from "react-redux"
import { withRouter } from 'react-router'

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

                this.props.onOk();
            }
        });
    }

    render() {

        const {loading} = this.props.userMng;

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: { span: 4 },
            },
            wrapperCol: {
                sm: { span: 20 },
            },
        };

        return (
            <Modal
                title="新增用户"
                visible={true}
                confirmLoading={loading}
                okText={"确定"}
                cancelText={"取消"}
                onOk={() => {
                    this.addUser();
                }}
                onCancel={() => this.props.onCancel()}
            >
                <Form>
                    <FormItem label={"姓名"}
                              {...formItemLayout}>
                        {
                            getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请输入姓名!',
                                }],
                            })(
                                <Input placeholder="姓名..."/>
                            )
                        }
                    </FormItem>

                    <FormItem label={"年龄"}
                              {...formItemLayout}>
                        {
                            getFieldDecorator('age', {
                                rules: [{
                                    required: true, message: '请输入年龄!',
                                }],
                            })(
                                <Input type={"number"} placeholder="年龄..."/>
                            )
                        }
                    </FormItem>

                    <FormItem label={"住址"}
                              {...formItemLayout}>
                        {
                            getFieldDecorator('address', {
                                rules: [{
                                    required: true, message: '请输入住址!',
                                }],
                            })(
                                <Input placeholder="住址..."/>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default withRouter(
    connect(
        ({userMng}) => ({userMng}),
        (dispatch) => ({dispatch})
    )(Form.create()(UserAdd))
);