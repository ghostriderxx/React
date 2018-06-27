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
    Button,
} from "../../framework/taglib";
import { Form, Input} from 'antd'; // 新型Form还没研究明白，怎么封装还没谱...

/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelResCachetTypeModify = {
    namespace: 'resCachetTypeModify',

    state: {
        zlbbh:null,
        zlbmc:null,
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

    reducers: {
        queryCachetTypeInfoSuccess(state, {payload}) {
            return {
                ...state,
                zlbbh: payload[0].zlbbh,
                zlbmc: payload[0].zlbmc,
            };
        },
    },
};
export {modelResCachetTypeModify};


/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({resCachetTypeModify})=>({resCachetTypeModify}))
@Form.create({
    mapPropsToFields(props) {
        return {
            zlbbh: Form.createFormField({
                value: props.resCachetTypeModify.zlbbh,
            }),
            zlbmc: Form.createFormField({
                value: props.resCachetTypeModify.zlbmc,
            }),
        };
    },
})
export default class ResCachetTypeModify extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const zlbbh = this.props.params.zlbbh;

        this.props.dispatch({
            type: "resCachetTypeModify/queryCachetTypeInfo",
            payload: zlbbh,
        });
    }

    saveCachetTypeInfoModify(){
        this.props.form.validateFields((err, values) => {
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

    cancel(){
        this.props.closeRES();
    }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        };
        return (
            <div>
                <Form>
                    <Form.Item
                        label="章类别编号"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('zlbbh', {
                            rules: [{ required: true,}],
                        })(
                            <Input disabled={true} type="text" placeholder="章类别编号" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="章类别名称"
                        {...formItemLayout}>
                        {getFieldDecorator('zlbmc', {
                            rules: [{ required: true, message: '请输入章类别名称!' }],
                        })(
                            <Input type="text" placeholder="章类别名称" />
                        )}
                    </Form.Item>
                </Form>
                <div style={{textAlign:"right"}}>
                    <Button onClick={()=>this.saveCachetTypeInfoModify()}>保存</Button>
                    <Button onClick={()=>this.cancel()}>取消</Button>
                </div>
            </div>
        );
    }
}