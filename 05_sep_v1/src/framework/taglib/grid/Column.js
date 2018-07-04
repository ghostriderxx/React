/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## PropTypes
import PropTypes from 'prop-types';

export default class Column extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return null;
    }
}

Column.propTypes = {
    name: PropTypes.string.isRequired,
    head: PropTypes.string.isRequired,
}