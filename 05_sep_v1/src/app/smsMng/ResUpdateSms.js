import React from 'react';
import {connect} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form
} from "../../framework/taglib";

import {request,MsgBox} from "../../framework/util";

@connect(({resUpdateSms})=>({resUpdateSms}))
export  default  class  ResUpdateSms extends  React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form wrappedComponentRef={(formObj) => this.formObj = formObj}
                      dataSource={this.props.resUpdateSms.smsds}>
                    <Form.StringInput name={"mbbh"} labelValue={"模板编号"} required={true}  requiredMessage={"请填写模板编号!"} />
                    <Form.StringInput name={"mbmc"} labelValue={"模板名称"} required={true} requiredMessage={"请填写模板名称!"}/>
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

    componentDidMount() {
        const mbbh = this.props.params.mbbh;
        this.props.dispatch({
            type: "resUpdateSms/initUpdateDs",
            payload: {
                mbbh
            },
        });
    }

    saveAddTemplate = ()=>{

        this.formObj.checkFormValues((err, values) => {
            if (!err) {
                const ymbbh = this.props.resUpdateSms.smsds[0].ymbbh;
                this.props.dispatch({
                    type: "resUpdateSms/saveAddTemplate",
                    payload: {
                        values,
                        ymbbh
                    },
                });
            }
        });

    }

    cancel = ()=>{
        this.props.closeRES();
    }
}

export const modelResUpdateSms = {
    namespace:"resUpdateSms",
    state:{
        smsds:[]
    },
    effects:{
        * initUpdateDs ({payload}, {call, put}){
            const {mbbh} = payload;
            const data = yield call(request, `/sep/SmsServlet/initUpdateDs?mbbh=${mbbh}`);
            const smsds = data.vds;
            yield put({
                type: "initUpdateDsSuccess",
                payload:{
                    smsds
                }
            });
        },

        * saveAddTemplate({payload}, {call, put}){
            const {
                mbbh,
                mbmc,
                mbnr,
                sql,
                tfbz,
                appid,
            } = payload.values;

            const ymbbh = payload.ymbbh;

            yield call(request, `/sep/SmsServlet/saveUpdateSmsTemplate?mbbh=${mbbh}&ymbbh=${ymbbh}&mbmc=${mbmc}&mbnr=${mbnr}
                &sql=${sql}&tfbz=${tfbz}&appid=${appid}`);

            MsgBox.show("修改成功");

            // 关闭RES
            yield put({
                type: "lane/closeRes",
            });
        }
    },
    reducers:{
        initUpdateDsSuccess(state,{payload}){

            return {
                ...state,
                smsds:payload.smsds
            }
        }
    }
}