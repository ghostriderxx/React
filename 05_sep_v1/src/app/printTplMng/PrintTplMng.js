import React from 'react';
import {RUIConnect,Rui} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form,
} from "../../framework/taglib";


import {MsgBox, request, URL} from "../../framework/util";

export default class PrintTplMng extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Panel>这是打印管理</Panel>
        )
    }

    componentDidMount() {
    }
}

export const model = {
    namespace: 'printTplMng',

    state: {
    },

    reducers: {
    },

    effects: {
    },
};