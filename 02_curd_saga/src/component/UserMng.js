/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React, Redux、Router
import React from "react"
import { connect } from "react-redux"
import { Route } from 'react-router'
import {
    push
} from "react-router-redux";

// ## antd
import {
    Form,
    Input,
    Button,
    Table,
    Row,
    Col,
    Divider,
    Icon,
    Modal,
} from 'antd';

// ## App
import UserAdd from "./UserAdd"
import UserEdit from "./UserEdit"

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({userMng, location}) => ({userMng, location}))
@Form.create()
export default class UserMng extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "FETCH_USERLIST_REQUESTED"
        });
    }

    // 查询
    query() {
        let userQueryKey = this.props.form.getFieldValue("userQueryKey");
        this.props.dispatch({
            type: "FETCH_USERLIST_REQUESTED",
            payload: userQueryKey
        });
    }

    // 清空
    clear() {
        this.props.form.resetFields(); // 清空表单控件（antd）
        this.props.dispatch({          // 清空模型数据
            type: "CLEAR_USERLIST",
        });
    }

    // 删除
    delete(user) {
        Modal.confirm({
            title: '确认',
            content: `确认删除【${user.name}】的人员信息？`,
            cancelText: "取消",
            okText: "确定",
            onOk: () => {
                this.props.dispatch({
                    type: "DELETE_USER_REQUESTED",
                    payload: user.id
                });
            }
        });
    }

    // 新增
    add() {
        this.props.dispatch( push("/userAdd") );
    }

    // 修改
    openUserEditDialog(id) {
        this.props.dispatch( push("/userEdit",  { empno: id }) );
    }

    render() {
        const FormItem = Form.Item;

        const {userList, loading} = this.props.userMng;

        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return (
            <div>
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
                            <Button type="primary" icon="plus-circle-o" onClick={() => this.add()}>新增</Button>
                        </Col>
                    </Row>
                </Form>
                <Table loading={loading}
                       rowKey="id"
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
                                   <a onClick={() => this.delete(record)}>
                                       <Icon type="delete"/>
                                   </a>

                                   <Divider type="vertical"/>

                                   <a onClick={() => this.openUserEditDialog(record.id)}>
                                        <Icon type="edit"/>
                                   </a>
                               </span>
                           )
                       }]}
                />



                <Route path="/userAdd" component={UserAdd}/>
                <Route path="/userEdit" component={UserEdit}/>
            </div>
        );
    }
}