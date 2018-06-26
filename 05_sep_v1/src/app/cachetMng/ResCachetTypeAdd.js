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
} from "../../framework/taglib";
import { Form, Input} from 'antd'; // 新型Form还没研究明白，怎么封装还没谱...

import {
    request
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
@Form.create()
@connect(({resCachetTypeAdd})=>({resCachetTypeAdd}))
export default class ResCachetTypeAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    saveCachetTypeInfoAdd(){
        this.props.form.validateFields((err, values) => {
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
                            rules: [{ required: true, message: '请填写章类别编号!' }],
                        })(
                            <Input type="text" placeholder="章类别编号" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="章类别名称"
                        {...formItemLayout}>
                        {getFieldDecorator('zlbmc', {
                            rules: [{ required: true, message: '请填写章类别名称!' }],
                        })(
                            <Input type="text" placeholder="章类别名称" />
                        )}
                    </Form.Item>
                </Form>

                <div style={{textAlign:"right"}}>
                    <Button onClick={()=>this.saveCachetTypeInfoAdd()}>保存</Button>
                    <Button onClick={()=>this.cancel()}>取消</Button>
                </div>
            </div>
        );
    }
}