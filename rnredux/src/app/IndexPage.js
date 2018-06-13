import React, {Component} from 'react';

import {createBottomTabNavigator} from "react-navigation";
import MENUBAR_REGISTRY from "../config/MENUBAR_REGISTRY";
import Ionicons from 'react-native-vector-icons/Ionicons';

// 这个地方暂时没有办法封装为标签的形式，
// 受React Navigation插件特性限制；

export default createBottomTabNavigator(
    genRouteConfigs(MENUBAR_REGISTRY),
    genBottomTabNavigatorConfig(MENUBAR_REGISTRY[0].name)
);

function genRouteConfigs(navItems) {

    let config = navItems.reduce((config, item) => {

        const {name, component, title, iconId} = item;

        return {
            ...config,
            [name]: {
                screen: component,
                navigationOptions: ({navigation}) => ({
                    title: title,
                    tabBarIcon: ({focused, tintColor}) => {
                        return <Ionicons name={focused ? iconId : `${iconId}-outline`} size={25}/>
                    }
                }),
            }
        };
    }, {});

    return config;
}

function genBottomTabNavigatorConfig(initialRouteName){
    return {
        initialRouteName,
        tabBarOptions: {
            activeTintColor: '#e91e63',
            labelStyle: {
                fontSize: 12,
            },
            style: {
                backgroundColor: '#ffffff',
            },
        }
    }
}