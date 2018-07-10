import React from 'react';
import {connect,Rui} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form,
} from "../../framework/taglib";


import {MsgBox, request} from "../../framework/util";

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
