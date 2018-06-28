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
} from "../../framework/util";

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
        loading: false,
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
        setCachetImageUrlSuccess(state, {payload}) {
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
                    type: `queryCachetList`,
                    payload:zlbbh
                });
                yield put({
                    type: `fetchCachetLoca`,
                    payload:zlbbh
                });
            }
        },
        // 根据章类别编号查询章信息
        * queryCachetList({payload}, {call, put}) {
            const vdo = yield call(request, `/sep/CachetServlet/queryCachetList?zlbbh=${payload}`);
            const {cachetds} = vdo;

            yield put({
                type: `queryCachetListSuccess`,
                payload: cachetds
            });

            if(cachetds.length){ // 做图片预览数据联动
                const zbh = cachetds[0].zbh;
                yield put({
                    type: `setCachetImageUrl`,
                    payload:zbh
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

        * setCachetImageUrl({payload}, {call, put}) {
            const cacheImageUrl = `/sep/CachetServlet/fetchCachetImage?zbh=${payload}&_=${Math.random()}`;

            yield put({
                type: `setCachetImageUrlSuccess`,
                payload: cacheImageUrl,
            });
        },



        //////////////////////////////////////////////////////////////////////////////
        // 新增章类别信息
        * cachetTypeAdd({payload}, {call, put, select}) {
            yield put({
                type: "lane/openRes",
                payload: {
                    componentPath: "app/cachetMng/ResCachetTypeAdd.js",
                    width: 600,
                    title: "新增章类别信息",
                    actionAfterClose: (params, dispatch)=>{
                        dispatch({
                            type: "queryCachetTypeList"
                        });
                    }
                }
            });
        },

        // 删除章类别信息
        * cachetTypeDelete({payload}, {call, put, select}) {
            const currentRowNumber = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });

            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber,
                    columnName: "zlbbh",
                }
            });

            yield call(request, `/sep/CachetServlet/deleteCachetTypeInfo?zlbbh=${zlbbh}`);

            yield put({
                type: "queryCachetTypeList"
            });
        },

        //修改章类别信息
        * cachetTypeModify({payload}, {call, put, select}) {
            const currentRowNumber = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });

            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber,
                    columnName: "zlbbh",
                }
            });

            yield put({
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
        },

        //////////////////////////////////////////////////////////////////////////////

        // 新增章信息
        * cachetAdd({payload}, {call, put, select}) {

            const currentRowNumber = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });

            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber,
                    columnName: "zlbbh",
                }
            });

            yield put({
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

            // 重新查询数据；
            yield put({
                type: `queryCachetList`,
                payload:zlbbh
            });
            yield put({
                type: `queryCachetLoca`,
                payload:zlbbh
            });
        },

        // 删除章信息
        * cachetDelete({payload}, {call, put, select}) {
            const currentRowNumber = yield yield put({
                type: "dwCachetInfo/gridGetCurrentRowNumber"
            });

            const zbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber,
                    columnName: "zbh",
                }
            });

            yield call(request, `/sep/CachetServlet/deleteCachetInfo?zbh=${zbh}`);


            const currentRowNumber1 = yield yield put({
                type: "dwCachetTypeInfo/gridGetCurrentRowNumber"
            });

            const zlbbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetTypeInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber1,
                    columnName: "zlbbh",
                }
            });


            // 重新查询
            // 重新查询数据；
            yield put({
                type: `queryCachetList`,
                payload:zlbbh
            });
            yield put({
                type: `queryCachetLoca`,
                payload:zlbbh
            });
        },

        // 修改章信息
        * cachetModify({payload}, {call, put, select}) {
            const currentRowNumber = yield yield put({
                type: "dwCachetInfo/gridGetCurrentRowNumber"
            });

            const zbh = yield yield put({ // 用消息手段操作Grid;
                type: "dwCachetInfo/gridGetCellValue",
                payload: {
                    rowNumber: currentRowNumber,
                    columnName: "zbh",
                }
            });

            yield put({
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
        },
    },
};
export {modelCachetMng};


/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({cachetMng})=>({cachetMng}))
export default class CachetMng extends React.Component {
    constructor(props){
        super(props);
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

    render(){
        const {cachettypeds, cachetds, tempds} = this.props.cachetMng;

        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid  name={"dwCachetTypeInfo"}
                           dataSource={cachettypeds}
                           rowKey="empno"
                           onRowClick={(record) => { // 点击行
                               this.props.dispatch({
                                   type: "cachetMng/queryCachetList",
                                   payload: record.zlbbh
                               });

                               this.props.dispatch({
                                   type: "cachetMng/queryCachetLoca",
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
                                                   type: "cachetMng/setCachetImageUrl",
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
                                    <img src={this.props.cachetMng.cachetImageUrl} style={{width: 100, height:100}}/>
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
}
