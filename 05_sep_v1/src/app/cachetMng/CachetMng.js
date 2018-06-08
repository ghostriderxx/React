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
            type: "cachetMng/FETCH_ZLBXX_REQUESTED"
        });
    }

    handleAddZlbxx(){
        alert("add");
    }

    handleEditZlbxx(){
        alert("edit");
    }

    handleDelZlbxx(){
        alert("del");
    }

    render(){

        const {zlbxxList, loading} = this.props.cachetMng;

        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid  ref={(ele)=>{this.dwCachetTypeInfo = ele} }
                           dataSource={zlbxxList}
                           loading={loading}
                           rowKey="empno"
                           columns={[{
                               title: '章类别编号',
                               dataIndex: 'zlbbh',
                           }, {
                               title: '章类别名称',
                               dataIndex: 'zlbmc',
                           }]}
                    />

                    <Button onClick={()=>this.handleAddZlbxx()}>新增</Button>
                    <Button onClick={()=>this.handleEditZlbxx()}>修改</Button>
                    <Button onClick={()=>this.handleDelZlbxx()}>删除</Button>
                </Panel>

                <Panel>
                    {/* 章信息 */}
                    <Tab defaultActiveKey="cachetInfo">
                        <TabPage tab="章信息" key="cachetInfo">
                            章信息
                        </TabPage>
                        <TabPage tab="章所在模板" key="cachetLoca">
                            <Grid  ref={(ele)=>{this.dwTempInfor = ele} }
                                   dataSource={[]}
                                   loading={loading}
                                   rowKey="empno"
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
