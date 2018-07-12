import React from 'react';

export default class Sheet extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
