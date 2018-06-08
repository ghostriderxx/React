// React
import React from 'react';

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import Panel from "../framework/taglib/panel/Panel";
import MenuBar from "../framework/taglib/menubar/MenuBar";

/////////////////////////////////////////////////////////////////////////////

import menubarItems from "./config/MenuBarConfig"

import Top from "./top/Top";


/////////////////////////////////////////////////////////////////////////////

export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Panel>
                <Top/>
                <MenuBar items={menubarItems}/>
            </Panel>
        );
    }
}