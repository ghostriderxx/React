/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

import PropTypes from "prop-types"

// ## redux-form
import {Field, reduxForm} from 'redux-form'

// ## Framework
import ModelNamespaceContext from "../../context/ModelNamespaceContext"
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
class FormWrapper extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.WrappedForm = reduxForm({
            form: `${this.props.modelNamespace}_${this.props.name}`,
        })(Form);
    }

    render(){
        const WrappedForm = this.WrappedForm;

        return (
            <div>
                <WrappedForm {...this.props}/>
            </div>
        );
    }
}
FormWrapper.PropTypes = {
    name: PropTypes.string.isRequired
};


export default (props) => (
    <ModelNamespaceContext.Consumer>
        {
            ({modelNamespace}) => <FormWrapper {...props} modelNamespace={modelNamespace} />
        }
    </ModelNamespaceContext.Consumer>
);