/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## PropTypes
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form'
// ## Antd
import { Input } from 'antd';

export default class NumberInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {name, initialValue} = this.props;

        return <Field
            name={name}
            type="number"
            component={"input"}
        />
    }
}

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    labelValue: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    initialValue: PropTypes.string,
}