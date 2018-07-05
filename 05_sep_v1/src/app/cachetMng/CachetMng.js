/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    connect,
    Rui,
} from "../../framework/core";
import {
    Buttons,
    Grid,
    Hlayout,
    Panel,
    Tab,
} from "../../framework/taglib";
import {
    request,
    MsgBox,
} from "../../framework/util";

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({cachetMng})=>({cachetMng}))
export default class CachetMng extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        const {cachettypeds, cachetds, tempds, cachetImageUrl} = this.props.cachetMng;

        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid name={"dwCachetTypeInfo"} dataSource={cachettypeds} onRowClick={this.cachetTypeGridClick}>
                        <Grid.Column name={"zlbbh"} head={"章类别编号"}/>
                        <Grid.Column name={"zlbmc"} head={"章类别名称"}/>
                    </Grid>

                    <Buttons>
                        <Buttons.Button onClick={this.cachetTypeAdd}>新增</Buttons.Button>
                        <Buttons.Button onClick={this.cachetTypeModify}>修改</Buttons.Button>
                        <Buttons.Button onClick={this.cachetTypeDelete}>删除</Buttons.Button>
                    </Buttons>
                </Panel>

                <Panel>
                    {/* 章信息 */}
                    <Tab defaultActiveKey="cachetInfo">
                        <Tab.TabPage tab="章信息" key="cachetInfo">
                            <Hlayout>
                                <Panel>
                                    <Grid name={"dwCachetInfo"} dataSource={cachetds} onRowClick={this.viewCachetImage}>
                                        <Grid.Column name={"zbh"} head={"章编号"}/>
                                        <Grid.Column name={"zmc"} head={"章名"}/>
                                        <Grid.Column name={"sigzbh"} head={"数字签章名称"}/>
                                        <Grid.Column name={"zgd"} head={"章高度"}/>
                                        <Grid.Column name={"zkd"} head={"章宽度"}/>
                                        <Grid.Column name={"zlbbh"} head={"章类别"}/>
                                    </Grid>
                                </Panel>
                                <Panel>
                                    <img src={cachetImageUrl} style={{width: 100, height:100}}/>
                                </Panel>
                            </Hlayout>
                            <Buttons>
                                <Buttons.Button onClick={this.cachetAdd}>新增</Buttons.Button>
                                <Buttons.Button onClick={this.cachetModify}>修改</Buttons.Button>
                                <Buttons.Button onClick={this.cachetDelete}>删除</Buttons.Button>
                            </Buttons>
                        </Tab.TabPage>
                        <Tab.TabPage tab="章所在模板" key="cachetLoca">
                            <Grid name={"dwTempInfor"} dataSource={tempds}>
                                <Grid.Column name={"mbmc"} head={"格式名称"}/>
                                <Grid.Column name={"zwmc"} head={"中文名称"}/>
                                <Grid.Column name={"mblx"} head={"模板类型"}/>
                                <Grid.Column name={"dylx"} head={"打印类型"}/>
                                <Grid.Column name={"systemtype"} head={"应用系统"}/>
                                <Grid.Column name={"scsj"} head={"上传时间"}/>
                            </Grid>
                        </Tab.TabPage>
                    </Tab>
                </Panel>
            </Hlayout>
        )
    }

    // onXXX
    cachetTypeGridClick = (record) =>{
        this.invoke("cachetMng/cachetTypeGridClick", record.zlbbh);
    }

    viewCachetImage = (record) =>{
        this.invoke("cachetMng/viewCachetImage", record.zbh);
    }


    // 章类别信息 增、删、改
    cachetTypeAdd = () => {
        this.invoke("cachetMng/cachetTypeAdd");
    }
    cachetTypeModify = () => {
        this.invoke("cachetMng/cachetTypeModify");
    }
    cachetTypeDelete = () => {
        this.invoke("cachetMng/cachetTypeDelete");
    }

    // 章信息 增、删、改
    cachetAdd = () => {
        this.invoke("cachetMng/cachetAdd");
    }

    cachetModify = () => {
        this.invoke("cachetMng/cachetModify");
    }

    cachetDelete = () => {
        this.invoke("cachetMng/cachetDelete");
    }
}

/////////////////////////////////////////////////////////////////////////////
// Model
//
export const modelCachetMng = {
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
        * queryCachetTypeList({payload}, {invoke}) {
            const vdo = yield request("/sep/CachetServlet/queryCachetTypeList");
            const {cachettypeds} = vdo;

            yield invoke("queryCachetTypeListSuccess", cachettypeds);

            if(cachettypeds.length){
                const zlbbh = cachettypeds[0].zlbbh;
                yield invoke("cachetTypeGridClick", zlbbh);
            }
        },

        // 点击章类别信息
        *cachetTypeGridClick({payload}, {invoke}) {
            const zlbbh = payload;
            yield invoke(`queryCachetList`, zlbbh);
            yield invoke(`queryCachetLoca`, zlbbh);
        },

        // 根据章类别编号查询章信息
        * queryCachetList({payload}, {invoke}) {
            const vdo = yield request(`/sep/CachetServlet/queryCachetList?zlbbh=${payload}`);
            const {cachetds} = vdo;

            yield invoke(`queryCachetListSuccess`, cachetds);

            if(cachetds.length){
                const zbh = cachetds[0].zbh;

                yield invoke(`viewCachetImage`, zbh);
            }
        },

        // 根据章类别编号查询所在模版信息
        * queryCachetLoca({payload}, {invoke}) {
            const vdo = yield request(`/sep/CachetServlet/queryCachetLoca?zlbbh=${payload}`);
            const {tempds} = vdo;

            yield invoke(`queryCachetLocaSuccess`, tempds);
        },

        // 显示章图片
        * viewCachetImage({payload}, {invoke}) {
            const cacheImageUrl = `/sep/CachetServlet/viewCachetImage?zbh=${payload}&_=${Math.random()}`;

            yield invoke(`viewCachetImageSuccess`, cacheImageUrl);
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 删除章类别信息
        * cachetTypeDelete({payload}, {invoke}) {
            const rowNu = yield yield invoke("dwCachetTypeInfo/gridGetCurrentRowNumber");
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // 获取即将删除的zlbbh、zlbmc
            const zlbbh = yield yield invoke("dwCachetTypeInfo/gridGetCellValue", {
                rowNumber: rowNu,
                columnName: "zlbbh",
            });
            const zlbmc = yield yield invoke("dwCachetTypeInfo/gridGetCellValue", {
                rowNumber: rowNu,
                columnName: "zlbmc",
            });
            if(!confirm("您确认要删除【"+zlbmc+"】吗？")){
                return;
            }

            // 删除
            yield request(`/sep/CachetServlet/deleteCachetTypeInfo?zlbbh=${zlbbh}`);

            // 重新查询章类别
            yield invoke("queryCachetTypeList");

            MsgBox.show("删除成功!");
        },

        // 新增章类别信息
        * cachetTypeAdd({payload}, {invoke, openRES}) {
            // openRES
            yield yield openRES("新增章类别信息", "app/cachetMng/ResCachetTypeAdd.js", 600);

            // RES关闭后的回调函数;
            yield invoke("queryCachetTypeList");
        },

        // 修改章类别信息
        * cachetTypeModify({payload}, {invoke, openRES}) {
            const rowNu = yield yield invoke("dwCachetTypeInfo/gridGetCurrentRowNumber");
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // zlbbh
            const zlbbh = yield yield invoke("dwCachetTypeInfo/gridGetCellValue", {
                rowNumber: rowNu,
                columnName: "zlbbh",
            });

            // openRES
            yield yield openRES("修改章类别信息", "app/cachetMng/ResCachetTypeModify.js", 600, 600, {
                zlbbh,
            });

            // RES关闭后的回调函数; 平面化代码结构
            yield invoke("queryCachetTypeList");
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 删除章信息
        * cachetDelete({payload}, {invoke}) {
            const rowNu = yield yield invoke("dwCachetInfo/gridGetCurrentRowNumber");
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // 获取zbh、zmc
            const zbh = yield yield invoke("dwCachetInfo/gridGetCellValue", {
                rowNumber: rowNu,
                columnName: "zbh",
            });
            const zmc = yield yield invoke("dwCachetInfo/gridGetCellValue", {
                rowNumber: rowNu,
                columnName: "zmc",
            });
            if(!confirm("您确认要删除【"+zmc+"】吗？")){
                return false;
            }

            // 删除
            yield request(`/sep/CachetServlet/deleteCachetInfo?zbh=${zbh}`);


            // 重新查询某特性[章类别信息]下的[章信息]、[模板信息]；
            const currentRowNumber1 = yield yield invoke("dwCachetTypeInfo/gridGetCurrentRowNumber");
            if(currentRowNumber1 == 0){
                alert("请先选中一行！");
                return;
            }
            const zlbbh = yield yield invoke("dwCachetTypeInfo/gridGetCellValue", {
                rowNumber: currentRowNumber1,
                columnName: "zlbbh",
            });
            yield invoke(`cachetTypeGridClick`, zlbbh);

            // 消息提示
            MsgBox.show("删除成功!");
        },

        // 新增章信息
        * cachetAdd({payload}, {invoke, openRES}) {

            const rowNu = yield yield invoke("dwCachetTypeInfo/gridGetCurrentRowNumber");
            if(rowNu == null){
                alert("请先选择章类别信息！");
                return false;
            }
            const zlbbh = yield yield invoke("dwCachetTypeInfo/gridGetCellValue", {
                rowNumber: rowNu,
                columnName: "zlbbh",
            });

            yield yield openRES("新增章信息", "app/cachetMng/ResCachetAdd.js", 600, 600, {
                zlbbh
            });

            // 重新查询某特性[章类别信息]下的[章信息]、[模板信息]；
            yield invoke(`cachetTypeGridClick`, zlbbh);
        },

        // 修改章信息
        * cachetModify({payload}, {invoke, openRES}) {
            const rowNu = yield yield invoke("dwCachetInfo/gridGetCurrentRowNumber");
            if(rowNu == null){
                alert("请先选中一行！");
                return false;
            }

            // zbh
            const zbh = yield yield invoke("dwCachetInfo/gridGetCellValue",{
                rowNumber: rowNu,
                columnName: "zbh",
            });

            // openRES
            yield yield openRES("修改章信息", "app/cachetMng/ResCachetModify.js", 600, 600, {
                zbh
            });

            // actionAfterClose
            // 重新查询某特性[章类别信息]下的[章信息]、[模板信息]；
            const currentRowNumber1 = yield yield invoke("dwCachetTypeInfo/gridGetCurrentRowNumber");
            if(currentRowNumber1 == 0){
                alert("请先选中一行！");
                return;
            }
            const zlbbh = yield yield invoke("dwCachetTypeInfo/gridGetCellValue", {
                rowNumber: currentRowNumber1,
                columnName: "zlbbh",
            });
            yield invoke(`cachetTypeGridClick`, zlbbh);
        },
    },
};