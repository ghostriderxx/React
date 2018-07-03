/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## PropTypes
import PropTypes from 'prop-types';

// ## Antd
import { Input } from 'antd';

export default class NumberInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {name, labelValue, required, requiredMessage, initialValue, ...rest} = this.props;

        return <Input {...rest} type="number" />;
    }
}

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    labelValue: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
    initialValue: PropTypes.string,
}