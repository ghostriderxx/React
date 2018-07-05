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
    request,
} from "../../framework/util";
import {
    Panel,
    Buttons,
    Form,
} from "../../framework/taglib";



/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({resCachetTypeModify})=>({resCachetTypeModify}))
export default class ResCachetTypeModify extends Rui {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form wrappedComponentRef={(inst) => this.formCachetType = inst}
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

        this.props.dispatch({
            type: "resCachetTypeModify/queryCachetTypeInfo",
            payload: zlbbh,
        });
    }

    saveCachetTypeInfoModify = () => {
        this.formCachetType.checkFormValues((err, values) => {
            if (!err) {
                const {zlbbh, zlbmc} = values;

                this.props.dispatch({
                    type: "resCachetTypeModify/saveCachetTypeInfoModify",
                    payload: {
                        zlbbh,
                        zlbmc,
                    }
                });
            }
        });
    }

    cancel = () => {
        this.props.closeRES();
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
        * queryCachetTypeInfo({payload}, {call, put}) {
            const data = yield call(request, `/sep/CachetServlet/queryCachetTypeInfo?zlbbh=${payload}`);
            yield put({
                type: "queryCachetTypeInfoSuccess",
                payload: data.cachettypeds
            });
        },

        * saveCachetTypeInfoModify({payload}, {call, put}) {
            const {zlbbh, zlbmc} = payload;

            yield call(request, `/sep/CachetServlet/saveCachetTypeInfoModify?zlbbh=${zlbbh}&zlbmc=${zlbmc}`);

            yield put({
                type: "lane/closeRes",
            });

        },
    },
};
