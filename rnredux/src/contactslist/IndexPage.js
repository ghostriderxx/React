import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import HomePage from "./HomePage"
import OfficePage from "./OfficePage"
import MyPage from "./MyPage"
import ContactList from "./ContactList"


export default createBottomTabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
            title: "首页",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Ionicons name={focused ? "ios-home" : "ios-home-outline"} size={25}/>
            }
        }),
    },
    ContactList: {
        screen: ContactList,
        navigationOptions: ({ navigation }) => ({
            title: "通讯录",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Ionicons name={focused ? "ios-contacts" : "ios-contacts-outline"} size={25}/>
            },
        }),
    },
    OfficePage: {
        screen: OfficePage,
        navigationOptions: ({ navigation }) => ({
            title: "办公",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Ionicons name={focused ? "ios-briefcase" : "ios-briefcase-outline"} size={25}/>
            },
        }),
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: ({ navigation }) => ({
            title: "我",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Ionicons name={focused ? "ios-man" : "ios-man-outline"} size={25}/>
            },
        }),
    },
},{
    initialRouteName: "Home",
    tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: '#ffffff',
        },
    }
});