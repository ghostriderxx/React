import React from 'react';
import { connect } from "react-redux"

import { Link } from 'react-router-dom'

/////////////////////////////////////////////////////////////////////////////

import {Menu} from "antd"

/////////////////////////////////////////////////////////////////////////////

import "./menubar.css"

/////////////////////////////////////////////////////////////////////////////

@connect(({routing})=>({
    routing
}))
export default class MenuBar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        // 当前路由状态
        const currentRoutePath = this.props.routing.location.pathname;

        const menuItems = this.props.items;

        const matchedMenuItem = menuItems.filter((item) => {
            return item.path == currentRoutePath
        });

        const currentSelectedMenuItemKey = matchedMenuItem.length ? matchedMenuItem[0].id : "";

        return (
            <Menu className={"dw-menubar"}
                  theme="light"
                  mode="horizontal"
                  selectedKeys={[ currentSelectedMenuItemKey ]}>
                {
                    menuItems.map((item) =>
                        <Menu.Item key={item.id}>
                            <Link to={item.path}>{item.text}</Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        )
    }
}

