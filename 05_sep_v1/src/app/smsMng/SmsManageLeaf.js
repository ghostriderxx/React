import React from 'react';
import {connect,Rui} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form
} from "../../framework/taglib";


import {MsgBox, request} from "../../framework/util";

@connect("smsManageLeaf")
export default class SmsManageLeaf extends Rui{
    constructor(props){
        super(props);
    }

    render(){
        const {smsds,mbbh,mbmc} = this.props.smsManageLeaf;
        return (
            <Panel>
                <Form wrappedComponentRef={(init) => this.formCachetType = init}>
                    <Form.StringInput name={"mbbh"} labelValue={"模板编号"} required={false} initialValue={mbbh} />
                    <Form.StringInput name={"mbmc"} labelValue={"模板名称"} required={false} initialValue={mbmc}/>
                </Form>
                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.querySmsInfo}>查询</Buttons.Button>
                    <Buttons.Button onClick={this.clear}>清空</Buttons.Button>
                </Buttons>

                <Grid name={"smsinfo"} dataSource={smsds} onRowClick={(a)=>(a)}>
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


    synchFormData =()=>{
        //没有getVlaue
        //同步数据，之后要删除！！！！！！

        this.formCachetType.checkFormValues((err, values) => {
            if (!err) {
                let {mbbh,mbmc} = values;
                if (mbbh === undefined){
                    mbbh = "";
                }

                if (mbmc === undefined){
                    mbmc = "";
                }

                this.props.invoke("syncFormData",{
                    mbbh,
                    mbmc
                })
            }
        });
    }

    querySmsInfo = () =>{
        this.synchFormData();
        this.formCachetType.checkFormValues((err, values) => {
            if (!err) {
                let {mbbh,mbmc} = values;
                if (mbbh === undefined){
                    mbbh = "";
                }

                if (mbmc === undefined){
                    mbmc = "";
                }

                this.props.invoke("querySmsInfo",{
                    mbbh,
                    mbmc
                })
            }
        });
    }

    clear = () =>{
        this.props.invoke("clearSuccess");

    }

    xzSms = ()=>{

        this.synchFormData();

        //为了获取当前form的value
        this.formCachetType.checkFormValues((err, values) => {
            const {mbbh,mbmc} = values;
            this.props.invoke("resAddSms",{
                mbbh,
                mbmc
            });
        });
    }

    xgSms = ()=>{
        this.synchFormData();

        this.formCachetType.checkFormValues((err, values) => {
            const {mbbh,mbmc} = values;
            this.props.invoke("resUpdateSms",{
                mbbh,
                mbmc
            });
        });
    }

    scSms = ()=>{

        this.synchFormData();

        this.props.invoke("deleteSms");
    }
}

export const modelSmsManageLeaf = {
    namespace : "smsManageLeaf",
    state: {
        smsds: [],
        mbbh: '',
        mbmc:'',
    },
    effects:{
        * querySmsInfo({payload}, {invoke,select}){

            const mbbh = yield select(state => state["smsManageLeaf"].mbbh);
            const mbmc = yield select(state => state["smsManageLeaf"].mbmc);
            const vdo = yield request(`/sep/SmsServlet/querySmsInfo?mbbh=${mbbh}&mbmc=${mbmc}`);
            const {vds} = vdo;
            yield invoke("querySmsInfoSuccess",{
                vds
            });
        },

        *resAddSms({payload}, {invoke,openRES}){
            yield yield openRES("新增短信模板","app/smsMng/ResAddSms.js",600);// openRES
            const {mbbh} = payload;
            yield invoke("querySmsInfo",{mbbh});// RES关闭后的回调函数; 平面化代码结构
        },

        // 修改章类别信息
        * resUpdateSms({payload}, {invoke,openRES}) {
            const rowNum = yield yield invoke("smsinfo/gridGetCurrentRowNumber");
            if(rowNum == 0){
                alert("请先选中一行！");
                return;
            }
            const mbbh = yield yield invoke("smsinfo/gridGetCellValue",{ // 用消息手段操作Grid;
                    rowNumber: rowNum,
                    columnName: "mbbh",
            });
            yield yield openRES("修改短信模板","app/smsMng/ResUpdateSms.js",600,600,{
                "mbbh":mbbh
            });

            yield invoke("querySmsInfo");
        },

        * deleteSms({payload}, {invoke,openRES}){
            const rowNum = yield yield invoke("smsinfo/gridGetCurrentRowNumber");
            if(rowNum == 0){
                alert("请先选中一行！");
                return;
            }
            const mbbhResult = yield yield invoke("smsinfo/gridGetCellValue",{ // 用消息手段操作Grid;
                rowNumber: rowNum,
                columnName: "mbbh",
            });
            const mbmcResult = yield yield invoke("smsinfo/gridGetCellValue",{ // 用消息手段操作Grid;
                rowNumber: rowNum,
                columnName: "mbmc",
            });
            if(!confirm("您确认要删除【"+mbmcResult+"】吗？")){
                return;
            }
            yield request(`/sep/SmsServlet/delSmsInfo?mbbh=${mbbhResult}`);
            MsgBox.show("删除成功!");


            yield invoke("querySmsInfo");
        }
    },
    reducers:{

        syncFormData(state, {payload}){
            return{
                ...state,
                mbbh:payload.mbbh,
                mbmc:payload.mbmc,
            }
        },

        querySmsInfoSuccess(state, {payload}) {
            return {
                ...state,
                smsds: payload.vds
            };
        },
        clearSuccess(state, {payload}){
            return {
                smsds: [],
                mbbh: '',
                mbmc:''
            };
        },
    },
};