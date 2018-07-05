/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    connect
} from "../../framework/core";

import {
    Buttons,
    Form,
    Panel,
} from "../../framework/taglib";

import {
    request,
    MsgBox
} from "../../framework/util";


/////////////////////////////////////////////////////////////////////////////
// UI
//
// @Form.create()
@connect(({resCachetTypeAdd})=>({resCachetTypeAdd}))
export default class ResCachetTypeAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form wrappedComponentRef={(inst) => this.formCachetType = inst}>
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
        this.formCachetType.checkFormValues((err, values) => {
            if (!err) {
                const {zlbbh, zlbmc} = values;

                this.props.dispatch({
                    type: "resCachetTypeAdd/saveCachetTypeInfoAdd",
                    payload: {
                        zlbbh,
                        zlbmc,
                    }
                });
            }
        });
    }

    cancel = () => {
        this.props.closeRES("helloworld");
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
        * saveCachetTypeInfoAdd({payload}, {call, put}) {
            const {zlbbh, zlbmc} = payload;

            yield call(request, `/sep/CachetServlet/saveCachetTypeInfoAdd?zlbbh=${zlbbh}&zlbmc=${zlbmc}`);

            yield call(MsgBox.show, "保存成功!")

            // 关闭RES
            yield put({
                type: "lane/closeRes",
            });
        },
    },
};
