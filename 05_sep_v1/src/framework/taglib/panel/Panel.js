import React from 'react';

export default class Panel extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return  <div {...this.props}></div>
    }
}
