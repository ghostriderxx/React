import React from 'react';
import {connect} from "react-redux";

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import Hlayout from "../../framework/taglib/hlayout/Hlayout";
import Panel from "../../framework/taglib/panel/Panel";
import Grid from "../../framework/taglib/grid/Grid";
import Button from "../../framework/taglib/button/Button";
import { Form, Input} from 'antd'; // 新型Form还没研究明白，怎么封装还没谱...

@Form.create()
@connect(
    ({resAachetAdd})=>({resAachetAdd}),
    (dispatch) => ({dispatch})
)
export default class ResCachetTypeAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    saveCachetTypeInfoAdd(){
        const {zlbbh, zlbmc} = this.props.form.getFieldsValue();
        this.props.dispatch({
            type: "resAachetAdd/saveCachetTypeInfoAdd",
            payload: {
                zlbbh,
                zlbmc,
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
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input type="text" placeholder="章类别编号" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="章类别名称"
                        {...formItemLayout}>
                        {getFieldDecorator('zlbmc', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input type="text" placeholder="章类别名称" />
                        )}
                    </Form.Item>
                </Form>


                <Button onClick={()=>this.saveCachetTypeInfoAdd()}>保存</Button>
                <Button onClick={()=>this.cancel()}>取消</Button>

            </div>
        );
    }
}