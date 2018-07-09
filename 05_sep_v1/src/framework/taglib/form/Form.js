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
                {this.props.children}
            </form>
        );
    }
}


@connect()
export default class FormWrapper extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.WrappedForm = reduxForm({
            form: `${this.props.name}`,
        })(Form);
    }

    render(){
        const WrappedForm = this.WrappedForm;

        return (
            <div>
                <WrappedForm initialValues={
                    this.props.dataSource && this.props.dataSource.length ? this.props.dataSource[0] : undefined
                } {...this.props}/>
            </div>
        );
    }
}

FormWrapper.PropTypes = {
    name: PropTypes.string.isRequired
};

FormWrapper.NumberInput = NumberInput;
FormWrapper.StringInput = StringInput;