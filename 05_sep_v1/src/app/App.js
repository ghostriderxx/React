/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    RUIConnect,
} from "../framework/core"

import {
    MenuBar,
    Panel,
    SheetContainer,
} from "../framework/taglib";

// ## App
import Top from "./top/Top";

/////////////////////////////////////////////////////////////////////////////
// UI
//
@RUIConnect("app")
export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Panel>
                <Top/>
                <MenuBar items={this.props.app.menubarConfig}/>
                <SheetContainer items={this.props.app.menubarConfig}/>
            </Panel>
        );
    }

    componentDidMount() {
    }
}

/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelApp = {

    namespace: 'app',

    state: {
        menubarConfig: [{
            id: "printTplMng",
            text: "打印管理",
            routePath: "/printTplMng",
            componentPath: "app/printTplMng/PrintTplMng.js"
        },{
            id: "smsMng",
            text: "短信模板管理",
            routePath: "/smsMng",
            componentPath: "app/smsMng/SmsMng.js"
        },{
            id: "cacheMng",
            text: "章管理",
            routePath: "/cacheMng",
            componentPath: "app/cachetMng/CachetMng.js"
        },],
    },

    effects: {
        // 可以进行权限管控...
    },

    reducers: {
        // 可以进行权限管控...
    },

};
export {modelApp};
