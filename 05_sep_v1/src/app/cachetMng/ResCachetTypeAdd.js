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
    Button,
    Form,
    StringInput
} from "../../framework/taglib";

import {
    request,
    MsgBox
} from "../../framework/util";

/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelResCachetTypeAdd = {
    namespace: 'resCachetTypeAdd',

    state: {
    },

    effects: {
        * saveCachetTypeInfoAdd({payload}, {call, put}) {
            const {zlbbh, zlbmc} = payload;

            yield call(request, `/sep/CachetServlet/saveCachetTypeInfoAdd?zlbbh=${zlbbh}&zlbmc=${zlbmc}`);

            // 关闭RES
            yield put({
                type: "lane/closeRes",
            });
        },
    },

    reducers: {
    },
};
export {modelResCachetTypeAdd};


/////////////////////////////////////////////////////////////////////////////
// UI
//
// @Form.create()
@connect(({resCachetTypeAdd})=>({resCachetTypeAdd}))
export default class ResCachetTypeAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    saveCachetTypeInfoAdd(){
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

    cancel(){
        this.props.closeRES("helloworld");
    }

    render(){
        return (
            <div>
                <Form wrappedComponentRef={(inst) => this.formCachetType = inst}>
                    <StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"}/>
                    <StringInput name={"zlbmc"} labelValue={"章类别名称"} required={true} requiredMessage={"章类别名称!"}/>
                </Form>

                <div style={{textAlign:"right"}}>
                    <Button onClick={()=>this.saveCachetTypeInfoAdd()}>保存</Button>
                    <Button onClick={()=>this.cancel()}>取消</Button>
                </div>
            </div>
        );
    }
}