//////////////////////////////////////////////////////////////////////////////
// React
//
import React from 'react';

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Panel from "../../framework/taglib/panel/Panel";
import Label from "../../framework/taglib/form/label/Label";

//////////////////////////////////////////////////////////////////////////////
// Component
//
import TopTitle from "../common/toptitle/TopTitle";

export default class MyPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Panel>
                <TopTitle>我</TopTitle>

                <Panel>
                    <Label>我</Label>
                </Panel>
            </Panel>
        );
    }
}