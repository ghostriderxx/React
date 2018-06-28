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
        cachetTypeList: [],
        cachetLoca:[],
        cachetList: [],
        cachetImageUrl: "",
        loading: false,
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/cacheMng') {
                    dispatch({
                        type: "fetchCachetTypeList"
                    });
                }
            });
        },
    },
    effects: {
        * setCachetImageUrl({payload}, {call, put}) {
            const cacheImageUrl = `/sep/CachetServlet/fetchCachetImage?zbh=${payload}&_=${Math.random()}`;

            yield put({
                type: `setCachetImageUrlSuccess`,
                payload: cacheImageUrl,
            });
        },
        * fetchCachetLoca({payload}, {call, put}) {

            const list = yield call(request, `/sep/CachetServlet/fetchCachetLoca?zlbbh=${payload}`);

            yield put({
                type: `fetchCachetLocaSuccess`,
                payload: list
            });
        },
        * fetchCachetList({payload}, {call, put}) {
            const list = yield call(request, `/sep/CachetServlet/fetchCachetList?zlbbh=${payload}`);
            yield put({
                type: `fetchCachetListSuccess`,
                payload: list
            });
            if(list.length){ // 做图片预览数据联动
                const zbh = list[0].zbh;
                yield put({
                    type: `setCachetImageUrl`,
                    payload:zbh
                });
            }
        },
        * fetchCachetTypeList({payload}, {call, put}) {
            const list = yield call(request, "/sep/CachetServlet/fetchCachetTypeList");

            yield put({type: `fetchCachetTypeListSuccess`, payload: list});

            if(list.length){
                const zlbbh = list[0].zlbbh;
                yield put({
                    type: `fetchCachetLoca`,
                    payload:zlbbh
                });
                yield put({
                    type: `fetchCachetList`,
                    payload:zlbbh
                });
            }
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
                            type: "fetchCachetTypeList"
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
                type: "fetchCachetTypeList"
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
                type: `fetchCachetLoca`,
                payload:zlbbh
            });
            yield put({
                type: `fetchCachetList`,
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
                type: `fetchCachetLoca`,
                payload:zlbbh
            });
            yield put({
                type: `fetchCachetList`,
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
    reducers: {
        fetchCachetTypeListSuccess(state, {payload}) {
            return {
                ...state,
                cachetTypeList: payload,
            };
        },
        fetchCachetListSuccess(state, {payload}) {
            return {
                ...state,
                cachetList: payload,
            };
        },
        fetchCachetLocaSuccess(state, {payload}) {
            return {
                ...state,
                cachetLoca: payload,
            };
        },
        setCachetImageUrlSuccess(state, {payload}) {
            return {
                ...state,
                cachetImageUrl: payload,
            };
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
        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid  name={"dwCachetTypeInfo"}
                           dataSource={this.props.cachetMng.cachetTypeList}
                           rowKey="empno"
                           onRowClick={(record) => { // 点击行
                               this.props.dispatch({
                                   type: "cachetMng/fetchCachetList",
                                   payload: record.zlbbh
                               });

                               this.props.dispatch({
                                   type: "cachetMng/fetchCachetLoca",
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
                                           dataSource={this.props.cachetMng.cachetList}
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
                                   dataSource={this.props.cachetMng.cachetLoca}
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
