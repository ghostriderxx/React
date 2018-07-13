/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## Redux
import {connect} from "react-redux";

// ## redux-form
import {reduxForm} from 'redux-form'

// ## prop-types
import PropTypes from "prop-types"

// ## Framework
import ModelNamespaceContext from "../../context/ModelNamespaceContext"


@connect()
class RUIForm extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        class RUIFormCore extends React.Component{
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

        const reduxFormCreator = reduxForm({
            form: `${this.props.modelNamespace}_${this.props.name}`,
            destroyOnUnmount : false,
        });

        this.ReduxForm = reduxFormCreator(RUIFormCore);
    }

    render(){
        const {ReduxForm} = this;

        return (
            <div>
                <ReduxForm {...this.props} />
            </div>
        );
    }
}
RUIForm.PropTypes = {
    name: PropTypes.string.isRequired
};


export default (props) => (
    <ModelNamespaceContext.Consumer>
        {
            ({modelNamespace}) => <RUIForm {...props} modelNamespace={modelNamespace} />
        }
    </ModelNamespaceContext.Consumer>
);