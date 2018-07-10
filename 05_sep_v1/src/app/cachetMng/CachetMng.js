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
    URL,
} from "../../framework/util";

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect("cachetMng")
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
export const modelCachetMng = {
    namespace: 'cachetMng',
    state: {
        cachetImageUrl: "",
    },
    reducers: {
        viewCachetImageSuccess(state, {payload}) {
            return {
                ...state,
                cachetImageUrl: payload,
            };
        },
    },
    effects: {
        // defer
        * defer({payload}, RUI) {
            yield RUI.invoke("queryCachetTypeList");
        },

        // 查询章类别信息
        * queryCachetTypeList({payload}, RUI) {
            const url = new URL("/sep/CachetServlet/queryCachetTypeList");

            const vdo = yield request(url.getURLString());

            yield yield RUI.invoke("dwCachetTypeInfo/fillData", vdo.cachettypeds);

            yield RUI.invoke("cachetTypeGridClick");
        },

        // 点击章类别信息
        *cachetTypeGridClick({payload}, RUI) {
            const rowCount = yield yield RUI.invoke("dwCachetTypeInfo/getRowCount");
            if(rowCount <= 0){
                return;
            }

            const rowNu = yield yield RUI.invoke("dwCachetTypeInfo/getCurrentRow");
            if(rowNu <= 0){
                return;
            }

            const zlbbh = yield yield RUI.invoke("dwCachetTypeInfo/getCellValue", {
                rowNumber: rowNu,
                columnName: "zlbbh",
            });

            yield yield RUI.invoke("queryCachetList", zlbbh);
            yield yield RUI.invoke("queryCachetLoca", zlbbh);
            yield yield RUI.invoke("viewCachetImage");
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
            yield yield RUI.invoke("dwCachetInfo/fillData", vdo.cachetds);
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

            yield yield RUI.invoke("dwTempInfor/fillData", vdo.tempds);
        },

        // 显示章图片
        * viewCachetImage({payload}, RUI) {
            const rowCount = yield yield RUI.invoke("dwCachetInfo/getRowCount");
            if(rowCount <= 0){
                return;
            }

            const rowNu = yield yield RUI.invoke("dwCachetInfo/getCurrentRow");
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            const zbh = yield yield RUI.invoke("dwCachetInfo/getCellValue",{
                rowNumber: rowNu,
                columnName: "zbh",
            });

            const cacheImageUrl = `/sep/CachetServlet/viewCachetImage?zbh=${zbh}&_=${Math.random()}`;

            yield RUI.invoke(`viewCachetImageSuccess`, cacheImageUrl);
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 新增章类别信息
        * cachetTypeAdd({payload}, RUI) {
            // openRES
            const ret = yield RUI.openRES("新增章类别信息", "app/cachetMng/ResCachetTypeAdd.js", 600);

            // RES关闭后回调
            yield RUI.invoke("afterSavaCachetTypeInfo", ret);
        },


        // 修改章类别信息
        * cachetTypeModify({payload}, RUI) {
            const rowNu = yield yield RUI.invoke("dwCachetTypeInfo/getCurrentRow");
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // zlbbh
            const zlbbh = yield yield RUI.invoke("dwCachetTypeInfo/getCellValue", {
                rowNumber: rowNu,
                columnName: "zlbbh",
            });

            // openRES
            const ret = yield RUI.openRES("修改章类别信息", "app/cachetMng/ResCachetTypeModify.js", 600, 600, {
                zlbbh,
            });

            // RES关闭后的回调
            yield RUI.invoke("afterSavaCachetTypeInfo", ret);
        },

        // 删除章类别信息
        * cachetTypeDelete({payload}, RUI) {
            const rowNu = yield yield RUI.invoke("dwCachetTypeInfo/getCurrentRow");
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // 获取即将删除的zlbbh、zlbmc
            const zlbbh = yield yield RUI.invoke("dwCachetTypeInfo/getCellValue", {
                rowNumber: rowNu,
                columnName: "zlbbh",
            });
            const zlbmc = yield yield RUI.invoke("dwCachetTypeInfo/getCellValue", {
                rowNumber: rowNu,
                columnName: "zlbmc",
            });
            if(!confirm("您确认要删除【"+zlbmc+"】吗？")){
                return;
            }

            // 删除
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

            const rowNu = yield yield RUI.invoke("dwCachetTypeInfo/getCurrentRow");
            if(rowNu == null){
                alert("请先选择章类别信息！");
                return false;
            }

            const zlbbh = yield yield RUI.invoke("dwCachetTypeInfo/getCellValue", {
                rowNumber: rowNu,
                columnName: "zlbbh",
            });
            if(!zlbbh){
                alert("请先选择章类别信息！");
                return false;
            }

            const ret = yield RUI.openRES("新增章信息", "app/cachetMng/ResCachetAdd.js", 600, 600, {
                zlbbh
            });

            // RES关闭后的回调
            yield invoke("actionAfterSubmit", ret);
        },

        // 修改章信息
        * cachetModify({payload}, RUI) {
            const rowNu = yield yield RUI.invoke("dwCachetInfo/getCurrentRow");
            if(rowNu == null){
                alert("请先选中一行！");
                return false;
            }

            // zbh
            const zbh = yield yield RUI.invoke("dwCachetInfo/getCellValue",{
                rowNumber: rowNu,
                columnName: "zbh",
            });

            // openRES
            const ret = yield RUI.openRES("修改章信息", "app/cachetMng/ResCachetModify.js", 600, 600, {
                zbh
            });

            // RES关闭后的回调
            yield invoke("actionAfterSubmit", ret);
        },

        // 提交数据后执行的方法
        * actionAfterSubmit({payload}, RUI) {
            alert("actionAfterSubmit:"+payload);
        },


        // 删除章信息
        * cachetDelete({payload}, RUI) {
            const rowNu = yield yield RUI.invoke("dwCachetInfo/getCurrentRow");
            if(rowNu == 0){
                alert("请先选中一行！");
                return;
            }

            // 获取zbh、zmc
            const zbh = yield yield RUI.invoke("dwCachetInfo/getCellValue", {
                rowNumber: rowNu,
                columnName: "zbh",
            });
            const zmc = yield yield RUI.invoke("dwCachetInfo/getCellValue", {
                rowNumber: rowNu,
                columnName: "zmc",
            });
            if(!confirm("您确认要删除【"+zmc+"】吗？")){
                return false;
            }

            // 删除
            const url = new URL("/sep/CachetServlet/deleteCachetInfo");
            url.addPara("zbh", zbh);
            yield request(url.getURLString());

            // 重新查询
            yield invoke(`cachetTypeGridClick`);

            // 消息提示
            MsgBox.show("删除成功!");
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // 提交数据后执行的方法
        * afterSavaCachetTypeInfo({payload}, RUI) {
            const zlbbh = payload;
            if(!zlbbh){
                return;
            }

            yield yield RUI.invoke("queryCachetList", zlbbh);
            yield yield RUI.invoke("queryCachetLoca", zlbbh);
            yield yield RUI.invoke("viewCachetImage");
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
        },
    },
};