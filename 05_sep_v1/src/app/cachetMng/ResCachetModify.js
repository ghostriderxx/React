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
    request,
} from "../../framework/util";
import {
    Buttons,
    Form,
    Panel
} from "../../framework/taglib";


/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({resCachetModify})=>({resCachetModify}))
export default class ResCachetModify extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form wrappedComponentRef={(inst) => this.formCachet = inst}
                      dataSource={this.props.resCachetModify.cachetds}>
                    <Form.StringInput name={"zbh"} labelValue={"章编号"} required={true} requiredMessage={"请填写章编号!"}/>
                    <Form.StringInput name={"zmc"} labelValue={"章名称"} required={true} requiredMessage={"请填写章名称!"}/>
                    <Form.StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"}/>
                    <Form.StringInput name={"sigzbh"} labelValue={"数字签章名称"} required={true} requiredMessage={"数字签章名称!"}/>
                    <Form.NumberInput name={"zgd"} labelValue={"章高度"} required={true} requiredMessage={"请填写章高度!"}/>
                    <Form.NumberInput name={"zkd"} labelValue={"章宽度"} required={true} requiredMessage={"请填写章宽度!"}/>
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

        this.props.dispatch({
            type: "resCachetModify/queryCachetInfo",
            payload: zbh,
        });
    }

    saveCachetInfoModify = () => {
        this.formCachet.checkFormValues((err, values) => {
            if (!err) {
                const {zbh,
                    zmc,
                    zlbbh,
                    sigzbh,
                    zgd,
                    zkd} = values;

                this.props.dispatch({
                    type: "resCachetModify/saveCachetInfoModify",
                    payload: {
                        zbh,
                        zmc,
                        zlbbh,
                        sigzbh,
                        zgd,
                        zkd,
                        yzbh: zbh,
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
const modelResCachetModify = {
    namespace: 'resCachetModify',

    state: {
        cachetds: null,
    },

    reducers: {
        queryCachetInfoSuccess(state, {payload}) {
            return {
                ...state,
                cachetds: payload,
            };
        },
    },

    effects: {
        * queryCachetInfo({payload}, {call, put}) {
            const data = yield call(request, `/sep/CachetServlet/queryCachetInfo?zbh=${payload}`);
            yield put({
                type: "queryCachetInfoSuccess",
                payload: data.cachetds
            });
        },

        * saveCachetInfoModify({payload}, {call, put}) {
            const {
                zbh,
                zmc,
                zlbbh,
                sigzbh,
                zgd,
                zkd,
                yzbh,
            } = payload;

            yield call(request, `/sep/CachetServlet/saveCachetInfoModify?zbh=${zbh}&zmc=${zmc}&zlbbh=${zlbbh}&sigzbh=${sigzbh}&zgd=${zgd}&zkd=${zkd}&yzbh=${yzbh}`);

            // 关闭RES
            yield put({
                type: "lane/closeRes",
            });
        },
    },
};
export {modelResCachetModify};
