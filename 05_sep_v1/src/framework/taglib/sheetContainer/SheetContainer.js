import React from 'react';

import { Route } from 'react-router'
import Frame from "../../../index"

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
                               component={Frame.getComponent(null, item.componentPath)}/>
                    )
                }
            </div>
        )
    }
}
