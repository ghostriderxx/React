/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

import PropTypes from "prop-types"

// ## redux-form
import {Field, reduxForm} from 'redux-form'

// ## antd
import { Form as AntdForm, Input, message} from 'antd';

// ## Framework
import StringInput from "./StringInput"
import NumberInput from "./NumberInput"
import Frame from "../../../index";
import {connect} from "react-redux";


class Form extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            <form>
                {console.log(this.props.children.length)}
                {
                    React.Children.map(this.props.children, (formItem, i) => {

                        const {name, labelValue, required, requiredMessage, initialValue} = formItem.props;

                        return (
                            formItem
                        );
                    })
                }
            </form>
        );
    }
}


@connect()
export default class FormWrapper extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const WrappedForm = reduxForm({
            form: `${this.props.name}`,
            onSubmit: (values) => {
                return delay(2000).then(() => {
                    alert(JSON.stringify(values))
                });
            }
        })(Form);

        return (
            <div>
                <WrappedForm {...this.props}/>
            </div>
        );
    }
}

FormWrapper.PropTypes = {
    name: PropTypes.string.isRequired
}


FormWrapper.NumberInput = NumberInput;
FormWrapper.StringInput = StringInput;


















// @AntdForm.create({
//     mapPropsToFields(props) {
//         if(props.dataSource && props.dataSource.length > 0){
//
//             var vdo = props.dataSource[0];
//
//             return Object.keys(vdo).reduce(
//                 (prev, curr) => {
//                     return {
//                         ...prev,
//                         [curr]: AntdForm.createFormField({
//                             value: vdo[curr],
//                         })
//                     }
//                 },
//                 {}
//             );
//         }
//     },
// })
//
// @reduxForm({
//     form: 'syncValidation', // Form 唯一标识
//     validate,               // Form Error级验证函数
//     warn,                   // Form Warn级验证函数
//     onSubmit: (values) => {
//         return delay(2000).then(() => {
//             alert(JSON.stringify(values))
//         });
//     }
// })
// class Form extends React.Component{
//     constructor(props){
//         super(props);
//     }
//
//     checkFormValues(fn){
//         this.props.form.validateFields(fn);
//     }
//
//     render(){
//         const {getFieldDecorator} = this.props.form;
//
//         const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
//         const labelStyle = {width:120, textAlign:"right"};
//
//         const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
//             <div style={rowStyle}>
//                 <label style={labelStyle}>{label}：</label>
//                 <div>
//                     <Input {...input} placeholder={label} type={type}/>
//                     {touched &&
//                     ((error && <span>{error}</span>) ||
//                         (warning && <span>{warning}</span>))}
//                 </div>
//             </div>
//         );
//
//         return (
//             <form>
//                 {
//                     React.Children.map(this.props.children, (formItem, i) => {
//
//                         const {name, labelValue, required, requiredMessage, initialValue} = formItem.props;
//
//                         return (
//                             <AntdForm.Item label={labelValue} {...formItemLayout}>
//                                 {getFieldDecorator(name, {
//                                     rules: [{ required, message: requiredMessage }],
//                                     initialValue
//                                 })(
//                                     formItem
//                                 )}
//                             </AntdForm.Item>
//                         );
//                     })
//                 }
//             </form>
//         )
//     }
// }
//
// Form.StringInput = StringInput;
// Form.NumberInput = NumberInput;
//
// export default Form;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// /////////////////////////////////////////////////////////////////////////////
// // Component Warpper
// //
// @connect()
// export default class FormWarpper extends React.Component{
//     constructor(props){
//         super(props);
//
//         // 给Grid分配唯一命名空间
//         var namespace = this.props.name;
//
//         this.state = {
//             namespace
//         }
//
//         // 给Grid分配Store空间
//         Frame.addModel(_modelGridFactory(namespace));
//
//         // 给Table分配实例
//         this.Instance = connect(
//             (store)=>({grid: store[namespace], namespace, loading: store.loading.global}),
//             (dispatch) => ({dispatch}),
//             null,
//             {withRef:true}
//         )(Grid)
//     }
//
//     componentWillMount(){
//         this.props.dispatch({
//             type: this.state.namespace+"/gridFillData",
//             payload: this.props.dataSource
//         });
//     }
//
//     componentWillReceiveProps(nextProps){
//         // 给GRID填充数据
//         this.props.dispatch({
//             type: this.state.namespace+"/gridFillData",
//             payload: nextProps.dataSource
//         });
//     }
//
//     sort(sortby){
//         this.props.dispatch({
//             type: this.state.namespace+"/gridSort",
//             payload:{
//                 sortby
//             }
//         });
//     }
//
//     render(){
//         const columns = this.props.children.map((column) => {
//             return {
//                 title: column.props.head,
//                 dataIndex: column.props.name,
//             }
//         });
//
//         return (
//             <this.Instance {...this.props} columns={columns}></this.Instance>
//         );
//     }
// }
//
