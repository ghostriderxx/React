/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    RUIConnect,
    Rui
} from "../../framework/core";
import {
    Buttons,
    Form,
    Panel,
} from "../../framework/taglib";
import {
    MsgBox,
    request,
    URL,
} from "../../framework/util";

/////////////////////////////////////////////////////////////////////////////
// UI
//
@RUIConnect("resCachetAdd")
export default class ResCachetAdd extends Rui {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form name="formCachetAdd">
                    <Form.StringInput name={"zbh"} labelValue={"章编号"} required={true} requiredMessage={"请填写章编号!"}/>
                    <Form.StringInput name={"zmc"} labelValue={"章名称"} required={true} requiredMessage={"请填写章名称!"}/>
                    <Form.StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"}/>
                    <Form.StringInput name={"sigzbh"} labelValue={"数字签章名称"} required={true} requiredMessage={"数字签章名称!"}/>
                    <Form.NumberInput name={"zgd"} labelValue={"章高度"} required={true} requiredMessage={"请填写章高度!"}/>
                    <Form.NumberInput name={"zkd"} labelValue={"章宽度"} required={true} requiredMessage={"请填写章宽度!"}/>
                    <Form.FileSelector name={"image"} labelValue={"选择章图片"}/>
                </Form>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={this.saveCachetInfoAdd}>保存</Buttons.Button>
                    <Buttons.Button onClick={this.cancel}>取消</Buttons.Button>
                </Buttons>
            </Panel>
        )
    }

    // defer = defer
    componentDidMount() {
        const zlbbh = this.props.params.zlbbh;
        this.props.invoke("defer", zlbbh);
    }

    // 保存增加的章信息
    saveCachetInfoAdd = () => {
        this.props.invoke("saveCachetInfoAdd");
    }

    // 关闭response
    cancel = () => {
        this.props.invoke("cancel");
    }
}


/////////////////////////////////////////////////////////////////////////////
// Model
//
export const model = {
    namespace: 'resCachetAdd',

    state: {
    },

    reducers: {
    },

    effects: {
        * defer({payload}, RUI) {
            yield RUI.invoke("fwdPageCachetAdd", payload);
        },

        * fwdPageCachetAdd({payload}, RUI) {
            const url = new URL("/sep/CachetServlet/fwdPageCachetAdd");

            url.addPara("zlbbh", payload);

            const vdo = yield request(url);

            const form = yield RUI.getObject("formCachetAdd");

            yield form.fillData(vdo.cachetds);
        },

        // 保存增加的章信息
        * saveCachetInfoAdd({payload}, RUI) {

            const form = yield RUI.getObject("formCachetAdd");

            const result = yield form.checkFormValues();

            if(result){
                const url = new URL("/sep/CachetServlet/saveCachetInfoAdd");

                const formValues = yield form.getFormValues();

                url.addForm(formValues);

                yield request(url);

                MsgBox.show("新增成功!");

                yield RUI.closeRES(formValues.zlbbh);
            }
        },


        // 关闭response
        * cancel({payload}, RUI) {
            yield RUI.closeRES();
        },
    },
};
