// React, Redux、Router
import React from "react"
import { connect } from "react-redux"
import { withRouter, Route } from 'react-router'

// antd
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Button,
    Table,
    Row,
    Col,
    Divider,
    Icon,
} from 'antd';

// Component
import UserAdd from "./UserAdd"
import UserEdit from "./UserEdit"

@withRouter
@connect(({userMng, location}) => ({userMng, location}))
@Form.create()
export default class UserMngApp extends React.Component {
    constructor(props) {
        super(props);
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

    delete(userId) {
        this.props.dispatch({
            type: "DELETE_USER_REQUESTED",
            payload: userId
        });

        this.query();
    }

    openUserAddDialog() {
        this.props.history.push("/userAdd");
    }

    openUserEditDialog(empno) {
        this.props.history.push("/userEdit",  { empno: empno });
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
                   }, {
                       title: '操作',
                       render: (text, record) => (
                           <span>
                               <a onClick={() => this.delete(record.empno)}>
                                   <Icon type="delete"/>
                               </a>

                               <Divider type="vertical"/>

                               <a onClick={() => this.openUserEditDialog(record.empno)}>
                                    <Icon type="edit"/>
                               </a>
                           </span>
                       )
                   }]}
            />


            {/* UserAdd */}
            <Route path="/userAdd" render={props => (
                <UserAdd onOk={() => {
                            this.props.history.goBack();
                            this.query();
                        }}
                         onCancel={() => {
                             this.props.history.goBack();
                         }}
                />
            )}/>

            {/* UserEdit */}
            <Route path="/userEdit" render={props => (
                <UserEdit {...props}
                          onOk={() => {
                              this.props.history.goBack();
                              this.query();
                          }}
                          onCancel={() => {
                              this.props.history.goBack();
                          }}
                />
            )}/>
        </div>;
    }
}