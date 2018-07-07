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
    Form,
    Panel,
} from "../../framework/taglib";

import {
    request,
    MsgBox,
    URL,
} from "../../framework/util";

/////////////////////////////////////////////////////////////////////////////
// UI
//
// @Form.create()
@connect("resCachetTypeAdd")
export default class ResCachetTypeAdd extends Rui {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form name={"formCachetTypeAdd"}>
                    <Form.StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"}/>
                    <Form.StringInput name={"zlbmc"} labelValue={"章类别名称"} required={true} requiredMessage={"章类别名称!"}/>
                </Form>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.saveCachetTypeInfoAdd}>保存</Buttons.Button>
                    <Buttons.Button onClick={this.cancel}>取消</Buttons.Button>
                </Buttons>
            </Panel>
        );
    }

    componentDidMount() {
    }

    saveCachetTypeInfoAdd = () => {
        this.props.invoke("saveCachetTypeInfoAdd");
    }

    cancel = () => {
        this.props.invoke("cancel");
    }
}


/////////////////////////////////////////////////////////////////////////////
// Model
//
export const modelResCachetTypeAdd = {
    namespace: 'resCachetTypeAdd',

    state: {
    },

    reducers: {
    },

    effects: {
        * saveCachetTypeInfoAdd({payload}, RUI) {

            const form = RUI.getObject("formCachetTypeAdd");

            const result = yield form.checkFormValues();

            if(result){
                const url = new URL("/sep/CachetServlet/saveCachetTypeInfoAdd");

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
