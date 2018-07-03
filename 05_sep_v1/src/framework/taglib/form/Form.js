/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## antd
import { Form as AntdForm, Input, message} from 'antd';

@AntdForm.create()
export default class Form extends React.Component{
    constructor(props){
        super(props);
    }

    checkFormValues(fn){
        this.props.form.validateFields(fn);
    }

    render(){
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        };

        return (
            <AntdForm>
                {
                    React.Children.map(this.props.children, (formItem, i) => {

                        const {name, labelValue, required, requiredMessage} = formItem.props;

                        return (
                            <AntdForm.Item label={labelValue} {...formItemLayout}>
                                {getFieldDecorator(name, {
                                    rules: [{ required, message: requiredMessage }],
                                })(
                                    <Input type="text" />
                                )}
                            </AntdForm.Item>
                        );
                    })
                }
            </AntdForm>
        )
    }
}