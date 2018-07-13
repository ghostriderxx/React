import React from 'react';
import {RUIConnect,Rui} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form
} from "../../framework/taglib";

import {request,MsgBox,URL} from "../../framework/util";

@RUIConnect("resAddSms")
export default class ResAddSms extends Rui{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Panel>
                <Form name={"formAddTemplate"}>
                    <Form.StringInput name={"mbbh"} labelValue={"模板编号"} required={true}   requiredMessage={"请填写模板编号!"} />
                    <Form.StringInput name={"mbmc"} labelValue={"模板名称"} required={true}  requiredMessage={"请填写模板名称!"}/>
                    <Form.StringInput name={"appid"} labelValue={"应用系统"} required={true}  requiredMessage={"请填写应用系统名称!"}/>
                    <Form.StringInput name={"tfbz"} labelValue={"停发标志"} required={false} />
                    <Form.StringInput name={"mbnr"} labelValue={"模板内容"} required={true} requiredMessage={"请填写模板内容!"}/>
                    <Form.StringInput name={"sql"} labelValue={"取值sql"} required={false} />
                </Form>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.saveAddTemplate}>保存</Buttons.Button>
                    <Buttons.Button onClick={this.cancel}>取消</Buttons.Button>
                </Buttons>

            </Panel>
        );
    }

    saveAddTemplate =()=>{
        this.props.invoke("saveAddTemplate");
    }

    cancel =()=>{
        this.props.invoke("cancel");
    }
}

export const model = {
    namespace:"resAddSms",
    state:{
    },
    effects:{
        *saveAddTemplate({payload},RUI){
            const formObj = yield RUI.getObject("formAddTemplate");
            const checkResult = yield formObj.checkFormValues();
            if (!checkResult){
                return;
            }

            const formVlaues = yield formObj.getFormValues();

            var url = new URL("/sep/SmsServlet/saveAddTemplate");
            url.addForm(formVlaues);
            yield request(url);

            MsgBox.show("新增成功");
            // 关闭RES
            yield RUI.closeRES();
        },
        *cancel({payload},RUI){
            yield RUI.closeRES();
        }

    },
    reducers:{
    },
}