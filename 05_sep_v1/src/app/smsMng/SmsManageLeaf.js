import React from 'react';
import {RUIConnect,Rui} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form,
    Grid
} from "../../framework/taglib";

import {MsgBox, request,URL} from "../../framework/util";

@RUIConnect("smsManageLeaf")
export default class SmsManageLeaf extends Rui{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Panel>
                <Form name={"newform"}>
                    <Form.StringInput name={"mbbh"} labelValue={"模板编号"} required={false}  />
                    <Form.StringInput name={"mbmc"} labelValue={"模板名称"} required={false}  />
                </Form>
                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.loadData}>查询</Buttons.Button>
                    <Buttons.Button onClick={this.clear}>清空</Buttons.Button>
                </Buttons>

                <Grid name={"smsinfo"}>
                    <Grid.Column name={"mbbh"} head={"模板编号"}/>
                    <Grid.Column name={"mbmc"} head={"模板名称"}/>
                    <Grid.Column name={"mbnr"} head={"模板内容"}/>
                    <Grid.Column name={"sql"} head={"取值sql"}/>
                    <Grid.Column name={"appid"} head={"应用系统"}/>
                    <Grid.Column name={"tfbz"} head={"停发标志"}/>
                </Grid>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.xzSms}>新增</Buttons.Button>
                    <Buttons.Button onClick={this.xgSms}>修改</Buttons.Button>
                    <Buttons.Button onClick={this.scSms}>删除</Buttons.Button>
                </Buttons>
            </Panel>
        );
    }

    componentDidMount() {
        this.props.invoke("defer");
    }

    loadData = () =>{
        this.props.invoke("loadData");
    }

    clear = () =>{
        this.props.invoke("clear");
    }

    xzSms = ()=>{
        this.props.invoke("xzSms");
    }

    xgSms = ()=>{
        this.props.invoke("xgSms");
    }

    scSms = ()=>{
        this.props.invoke("scSms");
    }
}

export const model  = {
    namespace : "smsManageLeaf",
    state: {
    },
    effects:{
         *defer({payload},RUI){
            yield RUI.invoke("loadData");
         },

        * loadData({payload},RUI){
            let formObj = yield RUI.getObject("newform");
            let checkResult = yield formObj.checkFormValues();
            if(!checkResult){
                return;
            }

            let formValues = yield formObj.getFormValues();

          //  let mbbh = formValues.mbbh;
           // let mbmc = formValues.mbmc;

            let url = new URL("/sep/SmsServlet/querySmsInfo");
           // url.addPara("mbbh",mbbh);
           // url.addPara("mbmc",mbmc);
            const vdo = yield request(url.getURLString());

            const grid = yield RUI.getObject("smsinfo");
            yield grid.fillData(vdo.vds);
        },


        *clear ({payload}, RUI){
            let formObj = yield RUI.getObject("newform");
            let gridObj = yield RUI.getObject("smsinfo");
            yield formObj.fillData([]);
            yield gridObj.fillData([]);

        },

        *xzSms({payload},RUI){
            yield RUI.openRES("新增短信模板","app/smsMng/ResAddSms.js",600);// openRES
            yield RUI.invoke("loadData");// RES关闭后的回调函数; 平面化代码结构
        },

        // 修改章类别信息
        * xgSms({payload},RUI) {
            const grid = yield RUI.getObject("smsinfo");
            const row = yield grid.getCurrentRow();
            if(row == 0){
                alert("请先选中一行！");
                return false;
            }
            const mbbh = yield grid.getCellValue(row,"mbbh");
            const mbmc = yield grid.getCellValue(row,"mbbh");

            yield RUI.openRES("修改短信模板","app/smsMng/ResUpdateSms.js",600,600,{
                "mbbh":mbbh,
                "mbmc":mbmc
            });

            yield RUI.invoke("loadData");
        },

        * scSms({payload}, RUI){
            const grid = yield RUI.getObject("smsinfo");
            const row = yield grid.getCurrentRow();
            if(row == 0){
                alert("请先选中一行！");
                return false;
            }
            const mbbh = yield grid.getCellValue(row,"mbbh");
            const mbmc = yield grid.getCellValue(row,"mbbh");

            if(!confirm("您确认要删除【"+mbmc+"】吗？")){
                return;
            }

            let url = new URL("/sep/SmsServlet/delSmsInfo");
            url.addPara("mbbh",mbbh);
           yield request(url.getURLString());

            MsgBox.show("删除成功!");
            yield RUI.invoke("loadData");
        }
    },
    reducers:{
    },
};