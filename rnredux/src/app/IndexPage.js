import React, {Component} from 'react';

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import BottomTabNavigator from "../framework/taglib/navigator/BottomTabNavigator";

// Components
import HomePage from "./home/HomePage"
import OfficePage from "./office/OfficePage"
import MyPage from "./my/MyPage"
import ContactList from "./contactlist/ContactList"

export default class IndexPage extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const NavItem = BottomTabNavigator.NavItem;

        return (
            <BottomTabNavigator defaultActiveNavItem={"Home"}>
                <NavItem
                    component={HomePage}
                    name={"Home"}
                    title={"首页"}
                    iconId={"ios-home"}/>
                <NavItem
                    component={ContactList}
                    name={"ContactList"}
                    title={"通讯录"}
                    iconId={"ios-contacts"}/>
                <NavItem
                    component={OfficePage}
                    name={"OfficePage"}
                    title={"办公"}
                    iconId={"ios-home"}/>
                <NavItem
                    component={MyPage}
                    name={"MyPage"}
                    title={"我"}
                    iconId={"ios-man"}/>
            </BottomTabNavigator>
        );
    }
}
