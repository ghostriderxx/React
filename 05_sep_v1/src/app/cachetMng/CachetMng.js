/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    RUIConnect,
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
    URL,
} from "../../framework/util";

/////////////////////////////////////////////////////////////////////////////
// UI
//
@RUIConnect("cachetMng")
export default class CachetMng extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        const {cachetImageUrl} = this.props.cachetMng;

        return (
            <Hlayout>
                {/* 章类别信息 */}
                <Panel width={370}>
                    <Grid name={"dwCachetTypeInfo"} onRowClick={this.cachetTypeGridClick}>
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
                                    <Grid name={"dwCachetInfo"} onRowClick={this.viewCachetImage}>
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
                            <Grid name={"dwTempInfor"}>
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

    //defer
    componentDidMount(){
        this.props.invoke("defer");
    }

    // 查询章类别信息
    queryCachetTypeList = () => {
        this.props.invoke("queryCachetTypeList");
    }

    // 点击章类别信息
    cachetTypeGridClick = (record) =>{
        this.props.invoke("cachetTypeGridClick");
    }

    viewCachetImage = (record) =>{
        this.props.invoke("viewCachetImage");
    }


    // 章类别信息 增、删、改
    cachetTypeAdd = () => {
        this.props.invoke("cachetTypeAdd");
    }
    cachetTypeModify = () => {
        this.props.invoke("cachetTypeModify");
    }
    cachetTypeDelete = () => {
        this.props.invoke("cachetTypeDelete");
    }

    // 章信息 增、删、改
    cachetAdd = () => {
        this.props.invoke("cachetAdd");
    }

    cachetModify = () => {
        this.props.invoke("cachetModify");
    }

    cachetDelete = () => {
        this.props.invoke("cachetDelete");
    }
}

/////////////////////////////////////////////////////////////////////////////
// Model
//
export const model = {
    namespace: 'cachetMng',
    state: {
        deferred: false,
        cachetImageUrl: "",
    },
    reducers: {
        deferredSuccess(state, {payload}) {
            return {
                ...state,
                cachetImageUrl: payload,
            };
        },

        viewCachetImageSuccess(state, {payload}) {
            return {
                ...state,
                deferred: true,
            };
        },
    },
    effects: {
        // defer = defer
        * defer({payload}, RUI) {
            const deferred = yield RUI.select(({cachetMng})=>(cachetMng.deferred));
            if(!deferred){
                yield RUI.invoke("queryCachetTypeList");
                yield RUI.invoke("deferredSuccess");
            }
        },

        // 查询章类别信息
        * queryCachetTypeList({payload}, RUI) {
            const url = new URL("/sep/CachetServlet/queryCachetTypeList");

            const vdo = yield request(url.getURLString());

            const grid = yield RUI.getObject("dwCachetTypeInfo");
            yield grid.fillData(vdo.cachettypeds);

            yield RUI.invoke("cachetTypeGridClick");
        },

        // 点击章类别信息
        *cachetTypeGridClick({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetTypeInfo");
            const rowCount = yield grid.getRowCount();
            if(rowCount <= 0){
                return;
            }
            const rowNu = yield grid.getCurrentRow();
            if(rowNu <= 0){
                return;
            }
            const zlbbh = yield grid.getCellValue(rowNu, "zlbbh");
            yield RUI.invoke("queryCachetList", zlbbh);
            yield RUI.invoke("queryCachetLoca", zlbbh);
            yield RUI.invoke("viewCachetImage");
        },

        // 根据章类别编号查询章信息
        * queryCachetList({payload}, RUI) {
            const zlbbh = payload;
            if(!zlbbh){
                return;
            }

            const url = new URL("/sep/CachetServlet/queryCachetList");
            url.addPara("zlbbh", zlbbh)

            const vdo = yield request(url.getURLString());

            const grid = yield RUI.getObject("dwCachetInfo");
            yield grid.fillData(vdo.cachetds);
        },

        // 根据章类别编号查询所在模版信息
        * queryCachetLoca({payload}, RUI) {
            const zlbbh = payload;
            if(!zlbbh){
                return;
            }

            const url = new URL("/sep/CachetServlet/queryCachetLoca");
            url.addPara("zlbbh", zlbbh);

            const vdo = yield request(url.getURLString());

            const grid = yield RUI.getObject("dwTempInfor");
            yield grid.fillData(vdo.tempds);
        },

        // 显示章图片
        * viewCachetImage({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetInfo");
            const rowCount = yield grid.getRowCount();
            if(rowCount <= 0){
                return;
            }
            const rowNu = yield grid.getCurrentRow();
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            const zbh = yield grid.getCellValue(rowNu, "zbh");

            const url = `/sep/CachetServlet/viewCachetImage?zbh=${zbh}&_=${Math.random()}`;

            yield RUI.invoke(`viewCachetImageSuccess`, url);
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 新增章类别信息
        * cachetTypeAdd({payload}, RUI) {
            const ret = yield RUI.openRES("新增章类别信息", "app/cachetMng/ResCachetTypeAdd.js", 600);

            // RES关闭后回调
            yield RUI.invoke("afterSavaCachetTypeInfo", ret);
        },


        // 修改章类别信息
        * cachetTypeModify({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetTypeInfo");
            const rowNu = yield grid.getCurrentRow();
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            const zlbbh = yield grid.getCellValue(rowNu, "zlbbh");

            const ret = yield RUI.openRES("修改章类别信息", "app/cachetMng/ResCachetTypeModify.js", 600, 600, {
                zlbbh,
            });

            // RES关闭后回调
            yield RUI.invoke("afterSavaCachetTypeInfo", ret);
        },

        // 删除章类别信息
        * cachetTypeDelete({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetTypeInfo");
            const rowNu = yield grid.getCurrentRow();
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }
            const zlbbh = yield grid.getCellValue(rowNu, "zlbbh");
            const zlbmc = yield grid.getCellValue(rowNu, "zlbmc");
            if(!confirm("您确认要删除【"+zlbmc+"】吗？")){
                return;
            }
            const url = new URL("/sep/CachetServlet/deleteCachetTypeInfo");
            url.addPara("zlbbh", zlbbh);
            yield request(url.getURLString());

            // 重新查询章类别
            yield RUI.invoke("queryCachetTypeList");
            MsgBox.show("删除成功!");
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 新增章信息
        * cachetAdd({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetTypeInfo");
            const rowNu = yield grid.getCurrentRow();
            if(rowNu == 0){
                alert("请先选择章类别信息！");
                return;
            }

            const zlbbh = yield grid.getCellValue(rowNu, "zlbbh");
            if(!zlbbh){
                alert("请先选择章类别信息！");
                return false;
            }

            const ret = yield RUI.openRES("新增章信息", "app/cachetMng/ResCachetAdd.js", 600, 600, {
                zlbbh
            });

            // RES关闭后回调
            yield RUI.invoke("actionAfterSubmit", ret);
        },

        // 修改章信息
        * cachetModify({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetInfo");
            const rowNu = yield grid.getCurrentRow();
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            const zbh = yield grid.getCellValue(rowNu, "zbh");

            const ret = yield RUI.openRES("修改章信息", "app/cachetMng/ResCachetModify.js", 600, 600, {
                zbh
            });

            // RES关闭后回调
            yield RUI.invoke("actionAfterSubmit", ret);
        },

        // 提交数据后执行的方法
        * actionAfterSubmit({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetTypeInfo");

            console.log(grid);

            const rowCount = yield grid.getRowCount();
            if(rowCount <= 0){
                return;
            }
            const rowNu = yield grid.getCurrentRow();
            if(rowNu == 0){
                return;
            }

            var zlbbh = yield grid.getCellValue(rowNu, "zlbbh");
            var zbh = payload;

            yield RUI.invoke("queryCachetList", zlbbh);
            yield RUI.invoke("goCachetGridRow", zbh);
            yield RUI.invoke("viewCachetImage");

            MsgBox.show("保存成功");
        },


        // 删除章信息
        * cachetDelete({payload}, RUI) {
            const grid = yield RUI.getObject("dwCachetInfo");
            const rowNu = yield grid.getCurrentRow();
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            const zbh = yield grid.getCellValue(rowNu, "zbh");
            const zmc = yield grid.getCellValue(rowNu, "zmc");
            if(!confirm("您确认要删除【"+zmc+"】吗？")){
                return false;
            }

            const url = new URL("/sep/CachetServlet/deleteCachetInfo");
            url.addPara("zbh", zbh);

            yield request(url.getURLString());

            yield RUI.invoke(`cachetTypeGridClick`);

            MsgBox.show("删除成功!");
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 提交数据后执行的方法
        * afterSavaCachetTypeInfo({payload}, RUI) {
            const zlbbh = payload;
            if(!zlbbh){
                return;
            }

            yield RUI.invoke("queryCachetTypeList");
            yield RUI.invoke("goCachetTypeGridRow", zlbbh);
            yield RUI.invoke("queryCachetList", zlbbh);
            yield RUI.invoke("viewCachetImage");
        },


        // 选中章信息Grid的某行
        * goCachetGridRow({payload}, RUI) {
            const zbh = payload;
            if(!zbh){
                return false;
            }
        },

        // 选中章类别信息Grid的某行
        * goCachetTypeGridRow({payload}, RUI) {
            const zlbbh = payload;
            if(!zlbbh){
                return false;
            }

            // goRow
            alert(zlbbh);
        },
    },
};