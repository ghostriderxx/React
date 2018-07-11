import React from 'react';
import {
    RUIConnect,
    Rui,
} from "../../framework/core";

import {
    Panel,
    Hlayout,
    Tree,
    SheetContainer
} from "../../framework/taglib";

@RUIConnect("smsMng")
export default class SmsMng extends Rui {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Hlayout>
                <Panel width={300}>
                     <Tree showLine={true} treeItems={this.props.smsMng.treeItems}></Tree>
                </Panel>
                <Panel>
                    <SheetContainer items={this.props.smsMng.treeItems}></SheetContainer>
                </Panel>
            </Hlayout>
        )
    }

    componentDidMount() {
    }
}

export const modelSmsMng = {
    namespace: 'smsMng',
    state: {
        treeItems: [{
            label: '格式维护',
            id: 'gswh',
            routePath: "/smsMng/smsManageLeaf",
            componentPath: "app/smsMng/SmsManageLeaf.js"
        }, {
            label: '批量上传',
            id: 'plsc',
            routePath: "/smsMng/smsManageLeaf1",
            componentPath: "app/smsMng/SmsManageLeaf.js"

        },
        {
            label: '批量下载',
            id: 'plxz',
            routePath: "/smsMng/smsManageLeaf2",
            componentPath: "app/smsMng/SmsManageLeaf.js"
        }],
    },

    effects: {
    },

    reducers: {
    },
};
