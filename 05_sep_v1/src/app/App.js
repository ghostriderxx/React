/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## FrameWork
import {
    connect,
} from "../framework/core"

import {
    MenuBar,
    Panel,
    SheetContainer,
} from "../framework/taglib";

// ## App
import Top from "./top/Top";
import PrintTplMng from "./printTplMng/PrintTplMng";
import SmsMng from "./smsMng/SmsMng";
import CachetMng from "./cachetMng/CachetMng";

/////////////////////////////////////////////////////////////////////////////
// Model
//
const modelApp = {

    namespace: 'app',

    state: {
        menubarConfig: [{
            id: "printTplMng",
            text: "打印管理",
            path: "/printTplMng",
            component: PrintTplMng
        },{
            id: "smsMng",
            text: "短信模板管理",
            path: "/smsMng",
            component: SmsMng
        },{
            id: "cacheMng",
            text: "章管理",
            path: "/cacheMng",
            component: CachetMng
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

/////////////////////////////////////////////////////////////////////////////
// UI
//
@connect(({app})=>({app}))
export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
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
}