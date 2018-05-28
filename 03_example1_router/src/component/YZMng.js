// React, Redux、Router
import React from "react"
import {connect} from "react-redux"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
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
    Divider,
    Icon,
    Radio,
    Checkbox,
} from 'antd';

// Component
import Sub1 from "./Sub1"
import Sub2 from "./Sub2"
import Sub3 from "./Sub3"


class YZMng extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "FETCH_YZLIST_REQUESTED"
        });
    }

    render() {
        // Antd
        const FormItem = Form.Item;
        const RadioGroup = Radio.Group;

        // Modal
        const {yzList, loading} = this.props.yzMng;

        // Form
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        return <div>
                {/* 病人信息 */}
                <p style={{
                    fontWeight: "bold",
                    color: "red",
                    fontSize: 15,
                }}>
                    李娜娜 女 30岁 床位：01床 住院号：201805001 入院日期：2018.05.02 类型：普通 押金：0 费用：0 余额：0
                </p>


                {/* Form表单 */}
                <Form layout="inline">
                    <FormItem>
                        {
                            getFieldDecorator('cqty', {})(
                                <RadioGroup>
                                    <Radio value={1}>长期</Radio>
                                    <Radio value={2}>临时</Radio>
                                </RadioGroup>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('xsty', {})(
                                <Checkbox>显示停用</Checkbox>
                            )
                        }
                    </FormItem>
                    <Button onClick={() => this.query()}>医嘱开立</Button>
                    <Button onClick={() => this.clear()}>保存</Button>
                    <Button onClick={() => this.clear()}>审核</Button>
                    <Button onClick={() => this.clear()}>全审核</Button>
                    <Button onClick={() => this.clear()}>取消审核</Button>
                    <Button onClick={() => this.clear()}>停止</Button>
                    <Button onClick={() => this.clear()}>全停</Button>
                    <Button onClick={() => this.clear()}>取消停止</Button>
                    <Button onClick={() => this.clear()}>删除</Button>
                    <Button onClick={() => this.clear()}>复制</Button>
                    <Button onClick={() => this.clear()}>粘贴</Button>
                </Form>

                {/*表格*/}
                <Table loading={loading}
                       rowKey="yzid"
                       dataSource={yzList}
                       onRow={(record, index) => {
                           return {
                               onClick: () => {
                                   this.props.dispatch({
                                       type:"SELECT_ROW",
                                       payload: index
                                   });

                                   if(index == 0){
                                       this.props.history.push("/yzMng/Sub1")
                                   }else if(index == 1){
                                       this.props.history.push("/yzMng/Sub2")
                                   }else if(index == 2){
                                       this.props.history.push("/yzMng/Sub3")
                                   }
                               },
                           };
                       }}
                       columns={[{
                           title: '开始时间',
                           dataIndex: 'kssj',
                       }, {
                           title: '医嘱描述',
                           dataIndex: 'yzms',
                       }, {
                           title: '状态',
                           dataIndex: 'zt',
                       }, {
                           title: '开始医师',
                           dataIndex: 'ksys',
                       }, {
                           title: '终止医师',
                           dataIndex: 'zzys',
                       }, {
                           title: '开始护士',
                           dataIndex: 'kshs',
                       }, {
                           title: '终止护士',
                           dataIndex: 'zzhs',
                       },{
                           title: '终止时间',
                           dataIndex: 'zzsj',
                       },{
                           title: '审核人',
                           dataIndex: 'shr',
                       },]}
                />

                <div>

                </div>

                {/* 路由 */}
                <Route path="/yzMng/Sub1" component={Sub1} />
                <Route path="/yzMng/Sub2" component={Sub2} />
                <Route path="/yzMng/Sub3" component={Sub3} />
            </div>;
    }
}

export default withRouter(connect(
    ({yzMng}) => ({yzMng}),
    (dispatch) => ({dispatch})
)(Form.create()(YZMng)));