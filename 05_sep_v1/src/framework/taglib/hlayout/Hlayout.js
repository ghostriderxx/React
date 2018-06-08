import React from 'react';

import "./hlayout.css"

export default class Hlayout extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return  <div {...this.props} className={"dw-hlayout"} ></div>
    }
}
