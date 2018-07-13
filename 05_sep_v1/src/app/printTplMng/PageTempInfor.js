import React from 'react';
import {RUIConnect,Rui} from  "../../framework/core";
import {
    Panel,
    Form,
    Buttons
} from "../../framework/taglib";

import {MsgBox, request, URL} from "../../framework/util";

@RUIConnect("PageTempInfor")
export default class PageTempInfor extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form name={"formTemplat"}>
                    <Form.StringInput name={"mbid"} labelValue={"模板Id"}></Form.StringInput>
                    <Form.StringInput name={"mbmc"} labelValue={"模板名称"}></Form.StringInput>
                    <Form.StringInput name={"mblx"} labelValue={"模板类型"}></Form.StringInput>
                    <Form.StringInput name={"dylx"} labelValue={"模板类型"}></Form.StringInput>
                    <Form.StringInput name={"zwmc"} labelValue={"模板类型"}></Form.StringInput>
                    <Form.StringInput name={"systemtype"} labelValue={"模板类型"}></Form.StringInput>
                    <Form.StringInput name={"scsj"} labelValue={"上传时间"}></Form.StringInput>
                </Form>
            </Panel>
        )
    }
    componentDidMount() {
        const mbid = this.props.params.mbid;
        const mbmc = this.props.params.mbmc;

        this.props.invoke("defer",{
            mbid,
            mbmc
        });
    }
}

export const model = {
    namespace: 'PageTempInfor',
    state: {
    },

    effects: {
        *defer({payload},RUI){
            const mbid = payload.mbid;
            var url = new URL("/sep/TemplateServlet/loadOIPData");
            url.addPara("mbid",mbid);
            const vdo = yield request(url);
            const formObj = yield RUI.getObject("formTemplat");
            yield formObj.fillData(vdo.tempinfor);
        },
    },

    reducers: {
    },
}

