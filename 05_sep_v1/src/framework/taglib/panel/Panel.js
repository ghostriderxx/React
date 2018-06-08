import PropTypes from 'prop-types';

import React from 'react';

export default class Panel extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        const width = this.props.width || "auto";

        return  <div {...this.props}
                     style={{
                         width: width
                     }}></div>
    }
}