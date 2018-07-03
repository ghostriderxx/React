/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## PropTypes
import PropTypes from 'prop-types';

export default class StringInput extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return "HelloWorld";
    }
}

StringInput.propTypes = {
    name: PropTypes.string.isRequired,
    labelValue: PropTypes.string,
    required: PropTypes.bool,
    requiredMessage: PropTypes.string,
}