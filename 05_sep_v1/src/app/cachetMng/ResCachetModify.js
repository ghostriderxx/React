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
import { Form, Input, InputNumber, Upload, Icon} from 'antd'; // 新型Form还没研究明白，怎么封装还没谱...

/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelResCachetModify = {
    namespace: 'resCachetModify',

    state: {
        zbh: null,
        zmc: null,
        zlbbh: null,
        sigzbh: null,
        zgd: null,
        zkd: null,
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

    reducers: {
        queryCachetInfoSuccess(state, {payload}) {
            return {
                ...state,
                zbh: payload[0].zbh,
                zmc: payload[0].zmc,
                zlbbh: payload[0].zlbbh,
                sigzbh: payload[0].sigzbh,
                zgd: payload[0].zgd,
                zkd: payload[0].zkd,
            };
        },
    },
};
export {modelResCachetModify};


/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({resCachetModify})=>({resCachetModify}))
@Form.create({
    mapPropsToFields(props) {
        return {
            zbh: Form.createFormField({
                value: props.resCachetModify.zbh,
            }),
            zmc: Form.createFormField({
                value: props.resCachetModify.zmc,
            }),
            zlbbh: Form.createFormField({
                value: props.resCachetModify.zlbbh,
            }),
            sigzbh: Form.createFormField({
                value: props.resCachetModify.sigzbh,
            }),
            zgd: Form.createFormField({
                value: props.resCachetModify.zgd,
            }),
            zkd: Form.createFormField({
                value: props.resCachetModify.zkd,
            }),
        };
    },
})
export default class ResCachetModify extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const zbh = this.props.params.zbh;

        this.props.dispatch({
            type: "resCachetModify/queryCachetInfo",
            payload: zbh,
        });
    }

    saveCachetInfoModify(){
        this.props.form.validateFields((err, values) => {
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
                        label="章编号"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('zbh', {
                            rules: [{ required: true, message: '请填写章编号!' }],
                        })(
                            <Input type="text" placeholder="章编号" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="章名称"
                        {...formItemLayout}>
                        {getFieldDecorator('zmc', {
                            rules: [{ required: true, message: '请填写章名称!' }],
                        })(
                            <Input type="text" placeholder="章名称" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="章类别编号"
                        {...formItemLayout}>
                        {getFieldDecorator('zlbbh', {
                            rules: [{ required: true, message: '请填写章类别编号!' }],
                        })(
                            <Input type="text" placeholder="章类别编号" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="数字签章名称"
                        {...formItemLayout}>
                        {getFieldDecorator('sigzbh', {
                            rules: [{ required: true, message: '请填写数字签章名称!' }],
                        })(
                            <Input type="text" placeholder="数字签章名称" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="章高度"
                        {...formItemLayout}>
                        {getFieldDecorator('zgd', {
                            rules: [{ required: true, message: '请填写章高度!' }],
                        })(
                            <InputNumber type="text" placeholder="章高度" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="章宽度"
                        {...formItemLayout}>
                        {getFieldDecorator('zkd', {
                            rules: [{ required: true, message: '请填写章宽度!' }],
                        })(
                            <InputNumber type="text" placeholder="章宽度" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="选择章图片"
                        {...formItemLayout}>
                        {getFieldDecorator('image', {
                            valuePropName: 'fileList',
                            getValueFromEvent: (e) => this.normFile(e),
                        })(
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button>
                                    <Icon type="upload" /> Click to upload
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                </Form>

                <div style={{textAlign:"right"}}>
                    <Button onClick={()=>this.saveCachetInfoModify()}>保存</Button>
                    <Button onClick={()=>this.cancel()}>取消</Button>
                </div>
            </div>
        )
    }
}