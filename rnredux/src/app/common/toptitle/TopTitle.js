//////////////////////////////////////////////////////////////////////////////
// React
//
import React from "react";

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Panel from "../../../framework/taglib/panel/Panel";
import Label from "../../../framework/taglib/form/label/Label";

export default class TopTitle extends React.Component {
    render(){
        return (
            <Panel style={{
                height: 50,
                backgroundColor:"#000000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Label fontSize={20} fontColor={"white"}>{this.props.children}</Label>
            </Panel>
        );
    }
}