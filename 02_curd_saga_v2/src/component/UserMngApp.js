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


// framework
import Grid from "../framework/Grid"

// Component
import UserAdd from "./UserAdd"
import UserEdit from "./UserEdit"

class UserMngApp extends React.Component {
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

    saveData(){

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
            {/* 这里是让开发实现类似getObject的功能，this.gridUserList.fnXXX访问Grid */}
            <Grid  ref={(ele)=>{this.gridUserList = ele} }
                   dataSource={userList}
                   loading={loading}
                   rowKey="empno"
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
            <Button type="primary" icon="plus-circle-o" onClick={() => { this.gridUserList.getWrappedInstance().sort("asc"); }}>排序</Button>


            {/* 这里是让开发实现类似getObject的功能，this.gridUserList.fnXXX访问Grid */}
            <Grid  ref={(ele)=>{this.gridUserList1 = ele} }
                   dataSource={userList}
                   loading={loading}
                   rowKey="empno"
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
            <Button type="primary" icon="plus-circle-o" onClick={() => { this.gridUserList1.getWrappedInstance().sort("asc"); }}>排序</Button>



            <br/><br/><br/><br/>
            <Button type="primary" onClick={() => { this.saveData() }}>保存数据</Button>




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

export default withRouter(
    connect(
        ({userMng, location}) => ({userMng, location}),
        (dispatch) => ({dispatch})
    )(Form.create()(UserMngApp))
);