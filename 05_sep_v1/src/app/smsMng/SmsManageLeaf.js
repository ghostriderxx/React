import React from 'react';
import {connect} from  "../../framework/core";
import {
    Buttons,
    Grid,
    Panel,
    Form
} from "../../framework/taglib";

import {MsgBox, request} from "../../framework/util";

@connect(({smsManageLeaf})=>({smsManageLeaf}))
export default class SmsManageLeaf extends React.Component{
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

    querySmsInfo = () =>{
        this.formCachetType.checkFormValues((err, values) => {
            if (!err) {
                let {mbbh,mbmc} = values;
                if (mbbh === undefined){
                    mbbh = "";
                }

                if (mbmc === undefined){
                    mbmc = "";
                }

                this.props.dispatch({
                    type: "smsManageLeaf/querySmsInfo",
                    payload: {
                        mbbh,
                        mbmc
                    }
                });
            }
        });
    }

    clear = () =>{
        this.props.dispatch({
            type: "smsManageLeaf/clearSuccess",
        });

    }

    xzSms = ()=>{
        //为了获取当前form的value
        this.formCachetType.checkFormValues((err, values) => {
            const {mbbh,mbmc} = values;
            this.props.dispatch({
                type: "smsManageLeaf/resAddSms"
            });
        });
    }

    xgSms = ()=>{
        this.formCachetType.checkFormValues((err, values) => {
            const {mbbh,mbmc} = values;
            this.props.dispatch({
                type: "smsManageLeaf/resUpdateSms"
            });
        });
    }

    scSms = ()=>{
        this.props.dispatch({
            type: "smsManageLeaf/deleteSms"
        });
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
        * querySmsInfo({payload}, {call,put,select}){

            // 这部分多余，要删掉！！！！！！！！！！！！！！！！！
            const mbbh1= payload.mbbh;
            const mbmc1= payload.mbmc;
            yield put({
                type: "syncForm",
                payload:{
                    mbbh:mbbh1 ,
                    mbmc:mbmc1,
                }
            });

            const {mbbh, mbmc} = yield select(state => state["smsManageLeaf"]);

            const vdo = yield call(request, `/sep/SmsServlet/querySmsInfo?mbbh=${mbbh}&mbmc=${mbmc}`);

            const {vds} = vdo;

            yield put({
                type: "querySmsInfoSuccess",
                payload:{
                    vds
                }
            });
        },

        *resAddSms({payload}, {call,put}){
            // openRES
            yield yield put({
                type: "lane/openRes",
                payload: {
                    componentPath: "app/smsMng/ResAddSms.js",
                    width: 600,
                    title: "新增短信模板"
                }
            });

            // RES关闭后的回调函数; 平面化代码结构
            yield put({
                type: "smsManageLeaf/querySmsInfo",
            });
        },

        // 修改章类别信息
        * resUpdateSms({payload}, {call, put, select}) {
            const rowNum = yield yield put({
                type: "smsinfo/gridGetCurrentRowNumber"
            });
            if(rowNum == 0){
                alert("请先选中一行！");
                return;
            }


            // mbbh
            const mbbhResult = yield yield put({ // 用消息手段操作Grid;
                type: "smsinfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNum,
                    columnName: "mbbh",
                }
            });

            // openRES
            yield yield put({
                type: "lane/openRes",
                payload: {
                    componentPath: "app/smsMng/ResUpdateSms.js",
                    width: 600,
                    title: "修改短信模板",
                    params:{
                        "mbbh":mbbhResult
                    }
                }
            });

            // RES关闭后的回调函数; 平面化代码结构
            yield put({
                type: "querySmsInfo",
            });
        },

        * deleteSms({payload}, {call, put, select}){
            const rowNum = yield yield put({
                type: "smsinfo/gridGetCurrentRowNumber"
            });
            if(rowNum == 0){
                alert("请先选中一行！");
                return;
            }

            // mbbh
            const mbbhResult = yield yield put({ // 用消息手段操作Grid;
                type: "smsinfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNum,
                    columnName: "mbbh",
                }
            });

            const mbmcResult = yield yield put({ // 用消息手段操作Grid;
                type: "smsinfo/gridGetCellValue",
                payload: {
                    rowNumber: rowNum,
                    columnName: "mbmc",
                }
            });

            if(!confirm("您确认要删除【"+mbmcResult+"】吗？")){
                return;
            }

            // 删除
            yield call(request, `/sep/SmsServlet/delSmsInfo?mbbh=${mbbhResult}`);
            MsgBox.show("删除成功!");


            // 重新查询
            yield put({
                type: "querySmsInfo",
            });
        }
    },
    reducers:{
        syncForm(state, {payload}) {
            return {
                ...state,
                mbbh: payload.mbbh,
                mbmc : payload.mbmc
            };
        },

        querySmsInfoSuccess(state, {payload}) {
            return {
                ...state,
                smsds: payload.vds,
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