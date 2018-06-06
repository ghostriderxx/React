import React from "react"
import {connect} from "react-redux"

// antd
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Spin,
    Table,
    Row,
    Col,
    Modal,
} from 'antd';


const FormItem = Form.Item;

class UserEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "FETCH_USER_REQUESTED",
            payload: {
                empno: this.props.location.state.empno
            }
        });
    }

    saveUser() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {empno, name, age, address} = values;

                this.props.dispatch({
                    type: "SAVE_USER_REQUESTED",
                    payload: {empno, name, age, address,}
                });

                this.props.onOk();
            }
        });
    }

    render() {
        const {loading} = this.props.userEdit;

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
                okText={"确定"}
                cancelText={"取消"}
                onOk={() => {
                    this.saveUser();
                }}
                onCancel={() => this.props.onCancel()}
            >
                <Spin spinning={loading}>
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
                </Spin>
            </Modal>

        );
    }
}

export default connect(
    ({userEdit}) => ({userEdit}),
    (dispatch) => ({dispatch})
)(Form.create({
    mapPropsToFields(props) {
        return {
            empno: Form.createFormField({
                value: props.location.state.empno, // 从Route中获取参数
            }),
            name: Form.createFormField({
                value: props.userEdit.user.name,
            }),
            age: Form.createFormField({
                value: props.userEdit.user.age,
            }),
            address: Form.createFormField({
                value: props.userEdit.user.address,
            }),
        };
    },
})(UserEdit));