/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    RUIConnect,
    Rui,
} from "../../framework/core";
import {
    MsgBox,
    request, URL,
} from "../../framework/util";
import {
    Buttons,
    Form,
    Panel
} from "../../framework/taglib";


/////////////////////////////////////////////////////////////////////////////
// UI
//
@RUIConnect("resCachetModify")
export default class ResCachetModify extends Rui {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form name="formCachetModify">
                    <Form.StringInput name={"yzbh"} labelValue={"原章编号"} required={true} requiredMessage={"请填写章编号!"}/>
                    <Form.StringInput name={"zbh"} labelValue={"章编号"} required={true} requiredMessage={"请填写章编号!"}/>
                    <Form.StringInput name={"zmc"} labelValue={"章名称"} required={true} requiredMessage={"请填写章名称!"}/>
                    <Form.StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"}/>
                    <Form.StringInput name={"sigzbh"} labelValue={"数字签章名称"} required={true} requiredMessage={"数字签章名称!"}/>
                    <Form.NumberInput name={"zgd"} labelValue={"章高度"} required={true} requiredMessage={"请填写章高度!"}/>
                    <Form.NumberInput name={"zkd"} labelValue={"章宽度"} required={true} requiredMessage={"请填写章宽度!"}/>
                    <Form.FileSelector name={"image"} labelValue={"选择章图片"}/>
                </Form>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.saveCachetInfoModify}>保存</Buttons.Button>
                    <Buttons.Button onClick={this.cancel}>取消</Buttons.Button>
                </Buttons>
            </Panel>
        )
    }

    componentDidMount() {
        const zbh = this.props.params.zbh;
        this.props.invoke("defer", zbh);
    }

    saveCachetInfoModify = () => {
        this.props.invoke("saveCachetInfoModify");
    }

    cancel = () => {
        this.props.invoke("cancel");
    }
}

/////////////////////////////////////////////////////////////////////////////
// Model
//
export const model = {
    namespace: 'resCachetModify',

    state: {
    },

    reducers: {
    },

    effects: {
        * defer({payload}, RUI) {
            yield RUI.invoke("queryCachetInfo", payload);
        },

        * queryCachetInfo({payload}, RUI) {
            const url = new URL("/sep/CachetServlet/queryCachetInfo");

            url.addPara("zbh", payload);

            const vdo = yield request(url);

            const form = yield RUI.getObject("formCachetModify");

            yield form.fillData(vdo.cachetds)
        },

        * saveCachetInfoModify({payload}, RUI) {
            const form = yield RUI.getObject("formCachetModify");

            const result = yield form.checkFormValues();

            if(result){
                const url = new URL("/sep/CachetServlet/saveCachetInfoModify");

                const formValues = yield form.getFormValues();

                url.addForm(formValues);

                yield request(url);

                MsgBox.show("修改成功!");

                yield RUI.closeRES();
            }
        },

        * cancel({payload}, RUI) {
            yield RUI.closeRES();
        },
    },
};