import React from 'react';

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import { Form, Input} from 'antd'; // 新型Form还没研究明白，怎么封装还没谱...

@Form.create()
export default class ResCachetTypeModify extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
                            <Input disabled={true} type="text" placeholder="章类别编号" />
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




            </div>
        );
    }
}