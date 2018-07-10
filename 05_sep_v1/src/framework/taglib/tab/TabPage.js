import React, {Fragment} from "react";

// antd
import {Tabs} from "antd";

export default class TabPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const TabPane = Tabs.TabPane;

        return (
            <Fragment>
                <TabPane {...this.props} forceRender={true}></TabPane>
            </Fragment>
        );
    }
}

