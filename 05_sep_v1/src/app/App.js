// React
import React from 'react';

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import {
    MenuBar,
    Panel,
    SheetContainer,
} from "../framework/taglib";

/////////////////////////////////////////////////////////////////////////////
// App
//
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
                <SheetContainer items={menubarItems}/>
            </Panel>
        );
    }
}