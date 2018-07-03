/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## antd
import { Form as AntdForm, Input, message} from 'antd';

@AntdForm.create({
    mapPropsToFields(props) {
        if(props.dataSource && props.dataSource.length > 0){

            var vdo = props.dataSource[0];

            return Object.keys(vdo).reduce(
                (prev, curr) => {
                    return {
                        ...prev,
                        [curr]: AntdForm.createFormField({
                            value: vdo[curr],
                        })
                    }
                },
                {}
            );
        }
    },
})
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

                        const {name, labelValue, required, requiredMessage, initialValue} = formItem.props;

                        return (
                            <AntdForm.Item label={labelValue} {...formItemLayout}>
                                {getFieldDecorator(name, {
                                    rules: [{ required, message: requiredMessage }],
                                    initialValue
                                })(
                                    formItem
                                )}
                            </AntdForm.Item>
                        );
                    })
                }
            </AntdForm>
        )
    }
}