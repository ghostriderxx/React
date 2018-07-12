/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## PropTypes
import PropTypes from 'prop-types';

// ## redux-form
import {Field} from 'redux-form'

// ## antd
import { Input } from 'antd';

// ## validator
import required from "./validators/required"

/////////////////////////////////////////////////////////////////////////////
// Field Render
//
const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
const labelStyle = {width:120, textAlign:"right"};

const renderField = ({input, labelValue, meta: {touched, error, warning}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{labelValue}：</label>
        <Input {...input} placeholder={labelValue}/>
    </div>
);

/////////////////////////////////////////////////////////////////////////////
// Component
//
export default class StringInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
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