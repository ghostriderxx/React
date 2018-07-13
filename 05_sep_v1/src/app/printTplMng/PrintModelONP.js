import React from 'react';
import {RUIConnect,Rui} from  "../../framework/core";
import {
    Panel,
    Grid,
    Form,
    Buttons
} from "../../framework/taglib";

import {MsgBox, request, URL} from "../../framework/util";

@RUIConnect("PrintModelONP")
export default class PrintModelONP extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form name={"formQueryTemplate"}>
                    <Form.StringInput name={"mbmc"} labelValue={"模板名称"}></Form.StringInput>
                </Form>
                <Buttons>
                    <Buttons.Button onClick={this.queryTempInfor} >查询</Buttons.Button>
                    <Buttons.Button onClick={this.addTemplate} >新增模板</Buttons.Button>
                </Buttons>
                <Grid name={"printInfo"} onDblClickRow={this.fwdModelDetailInfo}>
                    <Grid.Column name={"mbmc"} head={"模板名称"}></Grid.Column>
                    <Grid.Column name={"zwmc"} head={"中文名称"}></Grid.Column>
                    <Grid.Column name={"mblx"} head={"模板类型"}></Grid.Column>
                    <Grid.Column name={"dylx"} head={"打印类型"}></Grid.Column>
                    <Grid.Column name={"systemtype"} head={"应用系统"}></Grid.Column>
                    <Grid.Column name={"scsj"} head={"上传时间"}></Grid.Column>
                </Grid>
            </Panel>
        )
    }

    queryTempInfor = ()=>{
        this.props.invoke("queryTempInfor");
    }

    addTemplate =()=>{
        this.props.invoke("addTemplate");
    }

    fwdModelDetailInfo = ()=>{
        this.props.invoke("fwdModelDetailInfo");
    }
}

export const model = {
    namespace: 'PrintModelONP',

    state: {
    },

    effects: {
        *defer(){
        },

        *queryTempInfor({payload},RUI){
            const formObj = yield RUI.getObject("formQueryTemplate");
            const formValues = yield formObj.getFormValues();


            let mbmc = "";
            if(formValues){
                mbmc = formValues.mbmc;
            }

            let url = new URL("/sep/TemplateServlet/queryTempInfor");
            url.addPara("mbmc",mbmc);
            const vdo = yield request(url);

            const grid = yield RUI.getObject("printInfo");
            yield grid.fillData(vdo.printinfo);
        },

        *addTemplate(){
            alert('addTemplate');
        },

        *fwdModelDetailInfo({payload},RUI){

            const gridObj = yield  RUI.getObject("printInfo");
            const currentRow = yield gridObj.getCurrentRow();
            const mbid = yield gridObj.getCellValue(currentRow,"mbid");
            const mbmc = yield gridObj.getCellValue(currentRow,"mbmc");

            yield RUI.invoke("PrintTplMng/addOIP",{
                biz:null,
                id: mbid,
                text: mbmc,
                routePath: "/printTplMng/PrintModelOIP" + Math.random(),
                componentPath: "app/printTplMng/PageTempInfor.js",
                params:{
                    mbid,
                    mbmc
                }
            });

            yield RUI.invoke("PrintTplMng/goNewOIP",{
                mbid
            });

        }
    },

    reducers: {
    },
}

