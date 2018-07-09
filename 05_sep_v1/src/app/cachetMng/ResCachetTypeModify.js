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
    MsgBox,
    request,
    URL,
} from "../../framework/util";
import {
    Panel,
    Buttons,
    Form,
} from "../../framework/taglib";

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect("resCachetTypeModify")
export default class ResCachetTypeModify extends Rui {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form name={"formCachetTypeModify"}
                      dataSource={this.props.resCachetTypeModify.cachettypeds}>
                    <Form.StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"}/>
                    <Form.StringInput name={"zlbmc"} labelValue={"章类别名称"} required={true} requiredMessage={"请填写章类别名称!"}/>
                </Form>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.saveCachetTypeInfoModify}>保存</Buttons.Button>
                    <Buttons.Button onClick={this.cancel}>取消</Buttons.Button>
                </Buttons>
            </Panel>
        );
    }

    componentDidMount() {
        const zlbbh = this.props.params.zlbbh;
        this.props.invoke("queryCachetTypeInfo", zlbbh);
    }

    saveCachetTypeInfoModify = () => {
        this.props.invoke("saveCachetTypeInfoModify");
    }

    cancel = () => {
        this.props.invoke("cancel");
    }
}

/////////////////////////////////////////////////////////////////////////////
// Model
//
export const modelResCachetTypeModify = {
    namespace: 'resCachetTypeModify',

    state: {
        cachettypeds: null,
    },

    reducers: {
        queryCachetTypeInfoSuccess(state, {payload}) {
            return {
                ...state,
                cachettypeds: payload,
            };
        },
    },

    effects: {
        * queryCachetTypeInfo({payload}, RUI) {

            const url = new URL("/sep/CachetServlet/queryCachetTypeInfo");

            url.addPara("zlbbh", payload);

            const data = yield request(url.getURLString());

            yield RUI.invoke("queryCachetTypeInfoSuccess", data.cachettypeds);
        },

        * saveCachetTypeInfoModify({payload}, RUI) {

            const form = RUI.getObject("formCachetTypeModify");

            const result = yield form.checkFormValues();

            if(result){
                const url = new URL("/sep/CachetServlet/saveCachetTypeInfoModify");

                const formValues = yield form.getFormValues();

                url.addForm(formValues);

                yield request(url.getURLString());

                MsgBox.show("保存成功!");

                yield RUI.closeRES(formValues.zlbbh);
            }
        },

        * cancel({payload}, RUI) {
            yield RUI.closeRES();
        },
    },
};
