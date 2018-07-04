/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    connect
} from "../../framework/core";
import {
    Button,
    Grid,
    Hlayout,
    Panel,
    Tab,
    TabPage,
} from "../../framework/taglib";
import {
    request,
    MsgBox,
} from "../../framework/util";


/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({cachetMng})=>({cachetMng}))
export default class CachetMng extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const {cachettypeds, cachetds, tempds, cachetImageUrl} = this.props.cachetMng;

        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid  name={"dwCachetTypeInfo"}
                           dataSource={cachettypeds}
                           rowKey="empno"
                           onRowClick={(record) => { // 点击行
                               this.props.dispatch({
                                   type: "cachetMng/cachetTypeGridClick",
                                   payload: record.zlbbh
                               });
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
                                    <Grid  name={"dwCachetInfo"}
                                           dataSource={cachetds}
                                           rowKey="mbid"
                                           onRowClick={(record) => {
                                               this.props.dispatch({
                                                   type: "cachetMng/viewCachetImage",
                                                   payload: record.zbh,
                                               });
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
                            <Grid  name={"dwTempInfor"}
                                   dataSource={tempds}
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


    // 章类别信息 增、删、改
    cachetTypeAdd(){
        this.props.dispatch({
            type: "cachetMng/cachetTypeAdd"
        });
    }
    cachetTypeModify(){
        this.props.dispatch({
            type: "cachetMng/cachetTypeModify"
        });
    }
    cachetTypeDelete(){
        this.props.dispatch({
            type: "cachetMng/cachetTypeDelete",
        });
    }

    // 章信息 增、删、改
    cachetAdd(){
        this.props.dispatch({
            type: "cachetMng/cachetAdd",
        });
    }

    cachetModify(){
        this.props.dispatch({
            type: "cachetMng/cachetModify",
        });
    }

    cachetDelete(){
        this.props.dispatch({
            type: "cachetMng/cachetDelete",
        });
    }
}

/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelCachetMng = {
    namespace: 'cachetMng',
    state: {
        cachettypeds: [],
        cachetds: [],
        tempds:[],
        cachetImageUrl: "",
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/cacheMng') {
                    dispatch({
                        type: "queryCachetTypeList"
                    });
                }
            });
        },
    },
    reducers: {
        queryCachetTypeListSuccess(state, {payload}) {
            return {
                ...state,
                cachettypeds: payload,
            };
        },
        queryCachetListSuccess(state, {payload}) {
            return {
                ...state,
                cachetds: payload,
            };
        },
        queryCachetLocaSuccess(state, {payload}) {
            return {
                ...state,
                tempds: payload,
            };
        },
        viewCachetImageSuccess(state, {payload}) {
            return {
                ...state,
                cachetImageUrl: payload,
            };
        },
    },
    effects: {
        // 查询章类别信息
        * queryCachetTypeList({payload}, {call, put}) {
            const vdo = yield call(request, "/sep/CachetServlet/queryCachetTypeList");
            const {cachettypeds} = vdo;

            yield put({type: `queryCachetTypeListSuccess`, payload: cachettypeds});

            if(cachettypeds.length){
                const zlbbh = cachettypeds[0].zlbbh;
                yield put({
                    type: `cachetTypeGridClick`,
                    payload:zlbbh
                });
            }
        },

        // 点击章类别信息
        *cachetTypeGridClick({payload}, {call, put}) {
            const zlbbh = payload;
            yield put({
                type: `queryCachetList`,
                payload:zlbbh
            });
            yield put({
                type: `queryCachetLoca`,
                payload:zlbbh
            });
        },

        // 根据章类别编号查询章信息
        * queryCachetList({payload}, {call, put}) {
            const vdo = yield call(request, `/sep/CachetServlet/queryCachetList?zlbbh=${payload}`);
            const {cachetds} = vdo;

            yield put({
                type: `queryCachetListSuccess`,
                payload: cachetds
            });

            if(cachetds.length){
                const zbh = cachetds[0].zbh;
                yield put({
                    type: `viewCachetImage`,
                    payload: zbh
                });
            }
        },

        // 根据章类别编号查询所在模版信息
        * queryCachetLoca({payload}, {call, put}) {

            const vdo = yield call(request, `/sep/CachetServlet/queryCachetLoca?zlbbh=${payload}`);
            const {tempds} = vdo;

            yield put({
                type: `queryCachetLocaSuccess`,
                payload: tempds
            });
        },

        // 显示章图片
        * viewCachetImage({payload}, {call, put}) {
            const cacheImageUrl = `/sep/CachetServlet/viewCachetImage?zbh=${payload}&_=${Math.random()}`;

            yield put({
                type: `viewCachetImageSuccess`,
                payload: cacheImageUrl,
            });
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 删除章类别信息
        * cachetTypeDelete({payload}, {call, put, select}) {
            const rowNu = yield yield put({ // 个人感觉还是把这部分逻辑放到UI层中，比较负责业务习惯；
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }


            // 获取即将删除的zlbbh、zlbmc
            const zlbbh = yield yield put({ // 写在这，明显代码语法比较复杂;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNu,
                    columnName: "zlbbh",
                }
            });
            const zlbmc = yield yield put({
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNu,
                    columnName: "zlbmc",
                }
            });
            if(!confirm("您确认要删除【"+zlbmc+"】吗？")){
                return;
            }

            // 删除
            yield call(request, `/sep/CachetServlet/deleteCachetTypeInfo?zlbbh=${zlbbh}`);

            // 重新查询章类别
            yield put({
                type: "queryCachetTypeList"
            });

            MsgBox.show("删除成功!");
        },

        // 新增章类别信息
        * cachetTypeAdd({payload}, {call, put, select}) {
            // openRES
            yield yield put({
                type: "lane/openRes",
                payload: {
                    componentPath: "app/cachetMng/ResCachetTypeAdd.js",
                    width: 600,
                    title: "新增章类别信息"
                }
            });

            // RES关闭后的回调函数; 平面化代码结构
            yield put({
                type: "queryCachetTypeList",
            });
        },

        // 修改章类别信息
        * cachetTypeModify({payload}, {call, put, select}) {
            const rowNu = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // zlbbh
            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNu,
                    columnName: "zlbbh",
                }
            });

            // openRES
            yield yield put({
                type: "lane/openRes",
                payload: {
                    componentPath: "app/cachetMng/ResCachetTypeModify.js",
                    width: 600,
                    title: "修改章类别信息",
                    params:{
                        zlbbh,
                    }
                }
            });

            // RES关闭后的回调函数; 平面化代码结构
            yield put({
                type: "queryCachetTypeList",
            });
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 删除章信息
        * cachetDelete({payload}, {call, put, select}) {
            const rowNu = yield yield put({
                type: "dwCachetInfo/gridGetCurrentRowNumber"
            });
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // 获取zbh、zmc
            const zbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetInfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNu,
                    columnName: "zbh",
                }
            });
            const zmc = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetInfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNu,
                    columnName: "zmc",
                }
            });
            if(!confirm("您确认要删除【"+zmc+"】吗？")){
                return false;
            }

            // 删除
            yield call(request, `/sep/CachetServlet/deleteCachetInfo?zbh=${zbh}`);


            // 重新查询某特性[章类别信息]下的[章信息]、[模板信息]；
            const currentRowNumber1 = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });
            if(currentRowNumber1 == 0){
                alert("请先选中一行！");
                return;
            }
            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber1,
                    columnName: "zlbbh",
                }
            });
            yield put({
                type: `cachetTypeGridClick`,
                payload:zlbbh
            });

            // 消息提示
            MsgBox.show("删除成功!");
        },

        // 新增章信息
        * cachetAdd({payload}, {call, put, select}) {

            const rowNu = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });
            if(rowNu == null){
                alert("请先选择章类别信息！");
                return false;
            }
            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNu,
                    columnName: "zlbbh",
                }
            });

            yield yield put({
                type: "lane/openRes",
                payload: {
                    componentPath: "app/cachetMng/ResCachetAdd.js",
                    width: 600,
                    title: "新增章信息",
                    params: {
                        zlbbh
                    }
                }
            });

            // 重新查询某特性[章类别信息]下的[章信息]、[模板信息]；
            yield put({
                type: `cachetTypeGridClick`,
                payload:zlbbh
            });
        },

        // 修改章信息
        * cachetModify({payload}, {call, put, select}) {
            const rowNu = yield yield put({
                type: "dwCachetInfo/gridGetCurrentRowNumber"
            });
            if(rowNu == null){
                alert("请先选中一行！");
                return false;
            }

            // zbh
            const zbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetInfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNu,
                    columnName: "zbh",
                }
            });

            // openRES
            yield yield put({
                type: "lane/openRes",
                payload: {
                    componentPath: "app/cachetMng/ResCachetModify.js",
                    width: 600,
                    title: "修改章信息",
                    params:{
                        zbh,
                    }
                }
            });


            // actionAfterClose
            // 重新查询某特性[章类别信息]下的[章信息]、[模板信息]；
            const currentRowNumber1 = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });
            if(currentRowNumber1 == 0){
                alert("请先选中一行！");
                return;
            }
            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber1,
                    columnName: "zlbbh",
                }
            });
            yield put({
                type: `cachetTypeGridClick`,
                payload:zlbbh
            });
        },
    },
};
export {modelCachetMng};

