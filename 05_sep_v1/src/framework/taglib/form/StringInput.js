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



const required = value => (value || typeof value === 'number' ? undefined : 'Required');


export default class StringInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
        const labelStyle = {width:120, textAlign:"right"};

        const renderField = ({input, labelValue, meta: {touched, error, warning}}) => (
            <div style={rowStyle}>
                <label style={labelStyle}>{labelValue}：</label>
                <Input {...input} placeholder={labelValue}/>
            </div>
        );


        const {name, labelValue, initialValue} = this.props;

        return <Field
            name={name}
            type="text"
            component={renderField}
            labelValue={labelValue}
            validate={[required]}
        />
    }
}

StringInput.propTypes = {
    name: PropTypes.string.isRequired,
    labelValue: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    initialValue: PropTypes.string,
}