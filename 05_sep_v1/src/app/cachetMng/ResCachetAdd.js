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
    Grid,
    Hlayout,
    Panel,
    Tab,
    TabPage,
} from "../../framework/taglib";
import {
    request,
} from "../../framework/util";
import { Form, Input, InputNumber, Upload, Icon} from 'antd'; // 新型Form还没研究明白，怎么封装还没谱...

/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelResCachetAdd = {
    namespace: 'resCachetAdd',

    state: {
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

    reducers: {
    },
};
export {modelResCachetAdd};

/////////////////////////////////////////////////////////////////////////////
// UI
//
@Form.create({
    mapPropsToFields(props) {
        return {
            zlbbh: Form.createFormField({
                value: props.params.zlbbh,
            }),
        };
    },
})
@connect(({resCachetAdd})=>({resCachetAdd}))
export default class ResCachetAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    saveCachetInfoAdd(){
        this.props.form.validateFields((err, values) => {
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

    normFile(e){
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
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
                    <Button onClick={()=>this.saveCachetInfoAdd()}>保存</Button>
                    <Button onClick={()=>this.cancel()}>取消</Button>
                </div>
            </div>
        )
    }
}