/////////////////////////////////////////////////////////////////////////////
// Dependency
//
import React from "react"
import {connect} from "react-redux"
import {goBack} from "react-router-redux";

// antd
import {
    Form,
    Input,
    Spin,
    Table,
    Row,
    Col,
    Modal,
} from 'antd';

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({userEdit, router}) => ({userEdit, router}))
@Form.create({
    mapPropsToFields(props) {
        return {
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
})
export default class UserEdit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const id = this.props.router.location.state.id;
        this.props.dispatch({
            type: "FETCH_USER_REQUESTED",
            payload: id,
        });
    }

    onOk() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const id = this.props.router.location.state.id;
                const {name, age, address} = values;
                this.props.dispatch({
                    type: "SAVE_USER_REQUESTED",
                    payload: {id, name, age, address,}
                });
            }
        });
    }

    onCancel() {
        this.props.dispatch(goBack());
    }

    render() {
        const {loading} = this.props.userEdit;
        const {getFieldDecorator} = this.props.form;
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
                onOk={() => this.onOk()}
                onCancel={() => this.onCancel()}
            >
                <Spin spinning={loading}>
                    <Form>
                        <Form.Item label={"姓名"} {...formItemLayout}>
                            {
                                getFieldDecorator('name', {})(
                                    <Input placeholder="姓名..."/>
                                )
                            }
                        </Form.Item>

                        <Form.Item label={"年龄"} {...formItemLayout}>
                            {
                                getFieldDecorator('age', {})(
                                    <Input placeholder="年龄..."/>
                                )
                            }
                        </Form.Item>

                        <Form.Item label={"住址"} {...formItemLayout}>
                            {
                                getFieldDecorator('address', {})(
                                    <Input placeholder="住址..."/>
                                )
                            }
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>
        );
    }
}