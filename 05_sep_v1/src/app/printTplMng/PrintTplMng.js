import React from 'react';
import {connect,Rui} from  "../../framework/core";
import {
    Buttons,
    Panel,
    Form,
} from "../../framework/taglib";


import {MsgBox, request} from "../../framework/util";

// ## FrameWork
import {
    connect,
    Rui,
} from "../../framework/core";

export default class PrintTplMng extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Panel></Panel>
        )
    }

    componentDidMount() {
    }
}
