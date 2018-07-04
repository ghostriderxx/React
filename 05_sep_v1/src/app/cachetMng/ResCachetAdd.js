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
} from "../../framework/util";

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({resCachetAdd})=>({resCachetAdd}))
export default class ResCachetAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Panel>
                <Form wrappedComponentRef={(inst) => this.formCachet = inst}>
                    <Form.StringInput name={"zbh"} labelValue={"章编号"} required={true} requiredMessage={"请填写章编号!"}/>
                    <Form.StringInput name={"zmc"} labelValue={"章名称"} required={true} requiredMessage={"请填写章名称!"}/>
                    <Form.StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"} initialValue={this.props.params.zlbbh}/>
                    <Form.StringInput name={"sigzbh"} labelValue={"数字签章名称"} required={true} requiredMessage={"数字签章名称!"}/>
                    <Form.NumberInput name={"zgd"} labelValue={"章高度"} required={true} requiredMessage={"请填写章高度!"}/>
                    <Form.NumberInput name={"zkd"} labelValue={"章宽度"} required={true} requiredMessage={"请填写章宽度!"}/>
                </Form>

                <Buttons align={"right"}>
                    <Buttons.Button onClick={()=>this.saveCachetInfoAdd()}>保存</Buttons.Button>
                    <Buttons.Button onClick={()=>this.cancel()}>取消</Buttons.Button>
                </Buttons>
            </Panel>
        )
    }

    componentDidMount() {
    }

    saveCachetInfoAdd(){
        this.formCachet.checkFormValues((err, values) => {
            if (!err) {
                const {zbh,
                    zmc,
                    zlbbh,
                    sigzbh,
                    zgd,
                    zkd} = values;

                this.props.dispatch({
                    type: "resCachetAdd/saveCachetInfoAdd",
                    payload: {
                        zbh,
                        zmc,
                        zlbbh,
                        sigzbh,
                        zgd,
                        zkd,
                    }
                });
            }
        });
    }

    cancel(){
        this.props.closeRES();
    }
}


/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelResCachetAdd = {
    namespace: 'resCachetAdd',

    state: {
    },

    reducers: {
    },

    effects: {
        // 保存增加的章信息
        * saveCachetInfoAdd({payload}, {call, put}) {
            const {
                zbh,
                zmc,
                zlbbh,
                sigzbh,
                zgd,
                zkd
            } = payload;

            yield call(request, `/sep/CachetServlet/saveCachetInfoAdd?zbh=${zbh}&zmc=${zmc}&zlbbh=${zlbbh}&sigzbh=${sigzbh}&zgd=${zgd}&zkd=${zkd}`);

            // 关闭RES
            yield put({
                type: "lane/closeRes",
            });
        },
    },
};
export {modelResCachetAdd};
