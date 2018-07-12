/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

export default class Beacon extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div{...this.props}>
            </div>
        )
    }
}
