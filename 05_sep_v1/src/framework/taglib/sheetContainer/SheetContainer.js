import React from 'react';

import { Route } from 'react-router'

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
                               path={item.path}
                               component={item.component}/>
                    )
                }
            </div>
        )
    }
}
