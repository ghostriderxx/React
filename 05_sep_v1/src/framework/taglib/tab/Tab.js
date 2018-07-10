import React from 'react';

import { Tabs } from 'antd';

export default class Tab extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div style={{
                padding: 10
            }}>
                <Tabs {...this.props}></Tabs>
            </div>
        );
    }
}