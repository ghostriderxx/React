import React from 'react';

import { Route } from 'react-router'
import Frame from "../../../index"
import Sheet from "./Sheet";

export default class SheetContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.items.map((item) =>
                        <Route key={item.id}
                               path={item.routePath}
                               // component={Frame.getComponent(null, item.componentPath)}

                               render={(props)=>{

                                   const Content = Frame.getComponent(null, item.componentPath);

                                    return <Sheet {...props}>
                                        <Content></Content>
                                    </Sheet>;
                               }}
                        />
                    )
                }
            </div>
        )
    }
}
