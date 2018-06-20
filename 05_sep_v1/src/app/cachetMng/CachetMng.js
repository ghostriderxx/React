import React from 'react';
import {connect} from "react-redux";

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import {
    Button,
    Grid,
    Hlayout,
    Panel,
    Tab,
    TabPage,
} from "../../framework/taglib";

/////////////////////////////////////////////////////////////////////////////
// App
//
import ResCachetTypeAdd from "./ResCachetTypeAdd"
import ResCachetTypeModify from "./ResCachetTypeModify";


@connect(({cachetMng})=>({cachetMng}))
export default class CachetMng extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "cachetMng/fetchCachetTypeList"
        });
    }

    // 章类别信息 增、删、改
    cachetTypeAdd(){
        this.props.dispatch({
            type: "lane/openRes",
            payload: {
                component: ResCachetTypeAdd,
                width: 600,
                title: "新增章类别信息",
            }
        });
        // this.props.dispatch({
        //     type: "cachetMng/FETCH_CACHET_TYPE_LIST_REQUESTED"
        // });
    }

    cachetTypeModify(){
        this.props.dispatch({
            type: "lane/openRes",
            payload: {
                component: ResCachetTypeModify,
                width: 600,
                title: "修改章类别信息",
            }
        });
    }

    cachetTypeDelete(){
        alert("cachetTypeDelete");
    }


    // 章信息 增、删、改
    cachetAdd(){
        alert("cachetAdd");
    }

    cachetModify(){
        alert("cachetModify");
    }

    cachetDelete(){
        alert("cachetDelete");
    }



    render(){

        const {loading} = this.props.cachetMng;

        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid  ref={(ele)=>{this.dwCachetTypeInfo = ele} }
                           dataSource={this.props.cachetMng.cachetTypeList}
                           loading={loading}
                           rowKey="empno"
                           onRow={(record) => {
                               return {
                                   onClick: () => { // 点击行
                                       this.props.dispatch({
                                           type: "cachetMng/fetchCachetList",
                                           payload: record.zlbbh
                                       });

                                       this.props.dispatch({
                                           type: "cachetMng/fetchCachetLoca",
                                           payload: record.zlbbh
                                       });
                                   },
                               };
                           }}
                           columns={[{
                               title: '章类别编号',
                               dataIndex: 'zlbbh',
                           }, {
                               title: '章类别名称',
                               dataIndex: 'zlbmc',
                           }]}
                    />

                    <Button onClick={()=>this.cachetTypeAdd()}>新增</Button>
                    <Button onClick={()=>this.cachetTypeModify()}>修改</Button>
                    <Button onClick={()=>this.cachetTypeDelete()}>删除</Button>
                </Panel>

                <Panel>
                    {/* 章信息 */}
                    <Tab defaultActiveKey="cachetInfo">
                        <TabPage tab="章信息" key="cachetInfo">


                            <Hlayout>

                                <Panel>
                                    <Grid  ref={(ele)=>{this.dwCachetInfo = ele} }
                                           dataSource={this.props.cachetMng.cachetList}
                                           loading={loading}
                                           rowKey="mbid"
                                           onRow={(record) => {
                                               return {
                                                   onClick: () => { // 点击行
                                                       this.props.dispatch({
                                                           type: "cachetMng/setCachetImageUrl",
                                                           payload: record.zbh,
                                                       });
                                                   },
                                               };
                                           }}
                                           columns={[{
                                               title: '章编号',
                                               dataIndex: 'zbh',
                                           },{
                                               title: '章名',
                                               dataIndex: 'zmc',
                                           }, {
                                               title: '数字签章名称',
                                               dataIndex: 'sigzbh',
                                           },{
                                               title: '章高度',
                                               dataIndex: 'zgd',
                                           }, {
                                               title: '章宽度',
                                               dataIndex: 'zkd',
                                           },{
                                               title: '章类别',
                                               dataIndex: 'zlbbh',
                                           }]}
                                    />
                                </Panel>

                                <Panel>
                                    <img src={this.props.cachetMng.cachetImageUrl} style={{width: 100, height:100}}/>
                                </Panel>
                            </Hlayout>



                            <Button onClick={()=>this.cachetAdd()}>新增</Button>
                            <Button onClick={()=>this.cachetModify()}>修改</Button>
                            <Button onClick={()=>this.cachetDelete()}>删除</Button>
                        </TabPage>
                        <TabPage tab="章所在模板" key="cachetLoca">
                            <Grid  ref={(ele)=>{this.dwTempInfor = ele} }
                                   dataSource={this.props.cachetMng.cachetLoca}
                                   loading={loading}
                                   rowKey="mbid"
                                   columns={[{
                                       title: '格式名称',
                                       dataIndex: 'mbmc',
                                   },{
                                       title: '中文名称',
                                       dataIndex: 'zwmc',
                                   }, {
                                       title: '模板类型',
                                       dataIndex: 'mblx',
                                   },{
                                       title: '打印类型',
                                       dataIndex: 'dylx',
                                   }, {
                                       title: '应用系统',
                                       dataIndex: 'systemtype',
                                   },{
                                       title: '上传时间',
                                       dataIndex: 'scsj',
                                   }]}
                            />
                        </TabPage>
                    </Tab>
                </Panel>
            </Hlayout>
        )
    }
}
