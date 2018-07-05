import React from 'react';
import {connect} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form
} from "../../framework/taglib";

import {request,MsgBox} from "../../framework/util";

@connect(({resAddSms})=>({resAddSms}))
export default class ResAddSms extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {mbbh,mbmc,appid,tfbz,mbnr,sql} = this.props.resAddSms;
        return (
            <Panel>
                <Form wrappedComponentRef={(formObj) => this.formObj = formObj}>
                    <Form.StringInput name={"mbbh"} labelValue={"模板编号"} required={true}  initialValue={mbbh} requiredMessage={"请填写模板编号!"} />
                    <Form.StringInput name={"mbmc"} labelValue={"模板名称"} required={true} initialValue={mbmc} requiredMessage={"请填写模板名称!"}/>
                    <Form.StringInput name={"appid"} labelValue={"应用系统"} required={true} initialValue={appid} requiredMessage={"请填写应用系统名称!"}/>
                    <Form.StringInput name={"tfbz"} labelValue={"停发标志"} required={false} initialValue={tfbz}/>
                    <Form.StringInput name={"mbnr"} labelValue={"模板内容"} required={true} initialValue={mbnr} requiredMessage={"请填写模板内容!"}/>
                    <Form.StringInput name={"sql"} labelValue={"取值sql"} required={false} initialValue={sql}/>
                </Form>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.saveAddTemplate}>保存</Buttons.Button>
                    <Buttons.Button onClick={this.cancel}>取消</Buttons.Button>
                </Buttons>

            </Panel>
        );
    }

    saveAddTemplate =()=>{
        this.formObj.checkFormValues((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: "resAddSms/saveAddTemplate",
                    payload: values
                });
            }
        });
    }

    cancel =()=>{
        this.props.closeRES();
    }
}

export const modelResAddSms = {
    namespace:"resAddSms",
    state:{
    },
    effects:{
        *saveAddTemplate({payload}, {call,put}){
            const {
                mbbh,
                mbmc,
                mbnr,
                sql,
                tfbz,
                appid
            } = payload;

            yield call(request, `/sep/SmsServlet/saveAddTemplate?mbbh=${mbbh}&mbmc=${mbmc}&mbnr=${mbnr}
                &sql=${sql}&tfbz=${tfbz}&appid=${appid}`);


            MsgBox.show("新增成功");

            // 关闭RES
            yield put({
                type: "lane/closeRes",
            });
        }
    },
    reducers:{
    },
}