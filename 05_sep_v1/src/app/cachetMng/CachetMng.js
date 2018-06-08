import React from 'react';

/////////////////////////////////////////////////////////////////////////////
// FrameWork
//
import Hlayout from "../../framework/taglib/hlayout/Hlayout";
import Panel from "../../framework/taglib/panel/Panel";

export default class CachetMng extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Hlayout>

                <Panel width={370}>
                    张类别信息
                </Panel>

                <Panel>
                    张类别信息
                </Panel>

            </Hlayout>
        )
    }
}
