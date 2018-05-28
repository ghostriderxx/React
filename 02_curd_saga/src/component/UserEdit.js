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

class UserAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    saveUser() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {empno, name, age, address} = values;

                this.props.dispatch({
                    type: "EDIT_USER_REQUESTED",
                    payload: {empno, name, age, address,}
                });

                this.props.onOk();
            }
        });
    }

    render() {
        const empno = this.props.empno;

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
                title="修改用户信息"
                visible={true}
                confirmLoading={loading}
                okText={"确定"}
                cancelText={"取消"}
                onOk={() => {
                    this.saveUser();
                }}
                onCancel={() => this.props.onCancel()}
            >
                <Form>
                    <FormItem label={"EMPNO"}
                              {...formItemLayout}>
                        {
                            getFieldDecorator('empno', {})(
                                <Input placeholder="EMPNO..." disabled={true}/>
                            )
                        }
                    </FormItem>

                    <FormItem label={"姓名"}
                              {...formItemLayout}>
                        {
                            getFieldDecorator('name', {})(
                                <Input placeholder="姓名..."/>
                            )
                        }
                    </FormItem>

                    <FormItem label={"年龄"}
                              {...formItemLayout}>
                        {
                            getFieldDecorator('age', {})(
                                <Input placeholder="年龄..."/>
                            )
                        }
                    </FormItem>

                    <FormItem label={"住址"}
                              {...formItemLayout}>
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
)(Form.create({
    mapPropsToFields(props) {
        return {
            empno: Form.createFormField({ // Form与props中的值绑定
                value: props.empno,
            }),
        };
    },
})(UserAdd));