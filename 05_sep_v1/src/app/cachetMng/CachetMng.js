import React from 'react';
import {connect} from "react-redux";

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import Hlayout from "../../framework/taglib/hlayout/Hlayout";
import Panel from "../../framework/taglib/panel/Panel";
import Grid from "../../framework/taglib/grid/Grid";
import Button from "../../framework/taglib/button/Button";
import {Tab, TabPage} from "../../framework/taglib/tab/Tab";

/////////////////////////////////////////////////////////////////////////////
// App
//
import ResCachetTypeAdd from "./ResCachetTypeAdd"
import ResCachetTypeModify from "./ResCachetTypeModify";


@connect(
    ({cachetMng})=>({cachetMng}),
    (dispatch) => ({dispatch})
)
export default class CachetMng extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "cachetMng/FETCH_CACHET_TYPE_LIST_REQUESTED"
        });
    }

    // 章类别信息 增、删、改
    cachetTypeAdd(){
        this.props.dispatch({
            type: "lane/OPEN_RES_REQUESTED",
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
            type: "lane/OPEN_RES_REQUESTED",
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

        const {cachetTypeList, cachetList, cachetImageUrl, cachetLoca, loading} = this.props.cachetMng;

        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid  ref={(ele)=>{this.dwCachetTypeInfo = ele} }
                           dataSource={cachetTypeList}
                           loading={loading}
                           rowKey="empno"
                           onRow={(record) => {
                               return {
                                   onClick: () => { // 点击行
                                       this.props.dispatch({
                                           type: "cachetMng/FETCH_CACHET_LIST_REQUESTED",
                                           payload: record.zlbbh
                                       });

                                       this.props.dispatch({
                                           type: "cachetMng/FETCH_CACHET_LOCA_REQUESTED",
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
                                           dataSource={cachetList}
                                           loading={loading}
                                           rowKey="mbid"
                                           onRow={(record) => {
                                               return {
                                                   onClick: () => { // 点击行
                                                       this.props.dispatch({
                                                           type: "cachetMng/SET_CACHET_IMAGE_URL_REQUESTED",
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
                                    <img src={cachetImageUrl} style={{width: 100, height:100}}/>
                                </Panel>
                            </Hlayout>



                            <Button onClick={()=>this.cachetAdd()}>新增</Button>
                            <Button onClick={()=>this.cachetModify()}>修改</Button>
                            <Button onClick={()=>this.cachetDelete()}>删除</Button>
                        </TabPage>
                        <TabPage tab="章所在模板" key="cachetLoca">
                            <Grid  ref={(ele)=>{this.dwTempInfor = ele} }
                                   dataSource={cachetLoca}
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
