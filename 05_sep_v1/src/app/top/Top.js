import React from 'react';

/////////////////////////////////////////////////////////////////////////////

import {
    Panel,
} from "../../framework/taglib";

/////////////////////////////////////////////////////////////////////////////

import "./top.css"

/////////////////////////////////////////////////////////////////////////////

export default class Top extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <Panel className={"app-top"}>
                <Panel className={"app-top-title"}></Panel>
            </Panel>
        );
    }
}
