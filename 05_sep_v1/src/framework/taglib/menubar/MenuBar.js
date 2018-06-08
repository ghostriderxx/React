import React from 'react';
import {Link} from "react-router-dom"

/////////////////////////////////////////////////////////////////////////////

import {Menu} from "antd"

/////////////////////////////////////////////////////////////////////////////

export default class MenuBar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Menu theme="dark"
                  mode="horizontal"
                  style={{lineHeight: '34px'}}>
                {
                    this.props.items.map((menuItem) =>
                        <Menu.Item key={menuItem.id}>
                            <Link to={menuItem.path}>{menuItem.text}</Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        )
    }
}

