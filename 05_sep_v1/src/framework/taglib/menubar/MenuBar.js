import React from 'react';
import {Link} from "react-router-dom"

/////////////////////////////////////////////////////////////////////////////

import {Menu} from "antd"

/////////////////////////////////////////////////////////////////////////////

import "./menubar.css"

/////////////////////////////////////////////////////////////////////////////

export default class MenuBar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Menu className={"dw-menubar"}
                  theme="light"
                  mode="horizontal"
                  selectedKeys={["printTplMng"]}>
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

