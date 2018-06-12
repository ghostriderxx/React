//////////////////////////////////////////////////////////////////////////////
// React
//
import React from 'react';
import { withNavigation } from 'react-navigation';

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Panel from "../../framework/taglib/panel/Panel";
import Label from "../../framework/taglib/form/label/Label";

//////////////////////////////////////////////////////////////////////////////
// Component
//
import TopTitle from "../common/toptitle/TopTitle";

class HomePage extends React.Component {
    render(){
        return (
            <Panel>
                <TopTitle>首页</TopTitle>

                <Panel>
                    <Label>首页</Label>
                </Panel>
            </Panel>
        );
    }
}

export default withNavigation(HomePage);