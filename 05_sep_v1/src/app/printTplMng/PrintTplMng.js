import React from 'react';
import {RUIConnect,Rui} from  "../../framework/core";
import { Route } from 'react-router'
import {
    Panel,
    MenuBar,
    SheetContainer
} from "../../framework/taglib";

import {MsgBox, request, URL} from "../../framework/util";
import Frame from "../../index";

@RUIConnect("PrintTplMng")
export default class PrintTplMng extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        const itemConfigs = Array.concat(this.props.PrintTplMng.ONP,this.props.PrintTplMng.OIPArray);
        const activeKey = this.props.PrintTplMng.activeKey;


        return (
            <Panel>
                <MenuBar items={itemConfigs} />
                <div>
                    {
                        itemConfigs.map((item) =>
                            <Route key={item.id}
                                   path={item.routePath}
                                   render={()=>{

                                       const Content = Frame.getComponent(item.biz, item.componentPath);
                                       const params = item.params;

                                       return <Content params={params}></Content>
                                   }}
                            />
                        )
                    }
                </div>

            </Panel>
        )
    }
    componentDidMount() {
    }
}

export const model = {
    namespace: 'PrintTplMng',
    state: {
        ONP:[{
            biz:null,
            componentPath: "app/printTplMng/PrintModelONP.js",
            id: "printModelONP",
            text: "导航",
            routePath: "/printTplMng/PrintModelONP",
            params:null,
        }],
        OIPArray:[],
        activeKey:"printModelONP"
    },

    effects: {

    },

    reducers: {
        addOIP(state, {payload}){
            return {
                ...state,
                OIPArray: Array.concat(state.OIPArray,[payload])
            };
        },

        goNewOIP(state, {payload}){
            return {
                ...state,
                activeKey:payload
            };
        }
    },

};