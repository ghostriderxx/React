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
    StringInput,
    NumberInput,
    Panel,
} from "../../framework/taglib";
import {
    request,
} from "../../framework/util";

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

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({resCachetAdd})=>({resCachetAdd}))
export default class ResCachetAdd extends React.Component {
    constructor(props) {
        super(props);
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

    render(){
        return (
            <Panel>
                <Form wrappedComponentRef={(inst) => this.formCachet = inst}>
                    <StringInput name={"zbh"} labelValue={"章编号"} required={true} requiredMessage={"请填写章编号!"}/>
                    <StringInput name={"zmc"} labelValue={"章名称"} required={true} requiredMessage={"请填写章名称!"}/>
                    <StringInput name={"zlbbh"} labelValue={"章类别编号"} required={true} requiredMessage={"请填写章类别编号!"} initialValue={this.props.params.zlbbh}/>
                    <StringInput name={"sigzbh"} labelValue={"数字签章名称"} required={true} requiredMessage={"数字签章名称!"}/>
                    <NumberInput name={"zgd"} labelValue={"章高度"} required={true} requiredMessage={"请填写章高度!"}/>
                    <NumberInput name={"zkd"} labelValue={"章宽度"} required={true} requiredMessage={"请填写章宽度!"}/>
                </Form>

                <div style={{textAlign:"right"}}>
                    <Button onClick={()=>this.saveCachetInfoAdd()}>保存</Button>
                    <Button onClick={()=>this.cancel()}>取消</Button>
                </div>
            </Panel>
        )
    }
}