// React, Redux
import React from "react"
import {connect} from "react-redux"

// AntD
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    Table,
    Row,
    Col,
} from 'antd';

// Component
import UserAdd from "./UserAdd"

class UserMngApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserAddDialogOpen: false,
        }
    }

    query() {
        let userQueryKey = this.props.form.getFieldValue("userQueryKey");
        this.props.dispatch({
            type: "FETCH_USERLIST_REQUESTED",
            payload: userQueryKey
        });
    }

    clear() {
        this.props.form.resetFields();

        this.props.dispatch({
            type: "CLEAR_USERLIST",
        });
    }

    edit(userId) {
        alert(userId);
    }

    openUserAddDialog() {
        this.setState({
            isUserAddDialogOpen: true
        });
    }

    addUser() {

    }

    render() {
        const FormItem = Form.Item;

        const {userList, loading} = this.props.userMng;

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return <div>

            <Form layout="inline">

                <Row type="flex" justify="space-between">
                    <Col span={12}>
                        <FormItem label={"姓名"}>
                            {
                                getFieldDecorator('userQueryKey', {})(
                                    <Input placeholder="姓名、姓名拼音、身份证号..."/>
                                )
                            }
                        </FormItem>
                        <Button type="primary" icon="search" onClick={() => this.query()}>查询</Button>
                        <Button icon="rollback" onClick={() => this.clear()}>清空</Button>
                    </Col>

                    <Col span={4} style={{textAlign: 'right'}}>
                        <Button type="primary" icon="plus-circle-o" onClick={() => this.openUserAddDialog()}>新增</Button>
                    </Col>
                </Row>

            </Form>
            <Table loading={loading}
                   rowKey="empno"
                   dataSource={userList}
                   columns={[{
                       title: '姓名',
                       dataIndex: 'name',
                   }, {
                       title: '年龄',
                       dataIndex: 'age',
                   }, {
                       title: '住址',
                       dataIndex: 'address',
                   }]}
            />

            {
                this.state.isUserAddDialogOpen && <UserAdd onOk={() => {
                                                               this.setState({
                                                                   isUserAddDialogOpen: false
                                                               });

                                                               this.query();
                                                           }}
                                                           onCancel={() => {
                                                               this.setState({
                                                                   isUserAddDialogOpen: false
                                                               });
                                                           }}/>
            }


        </div>;
    }
}

export default connect(
    ({userMng}) => ({userMng}),
    (dispatch) => ({dispatch})
)(Form.create()(UserMngApp));