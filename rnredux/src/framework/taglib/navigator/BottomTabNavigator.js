import PropTypes from 'prop-types';

//////////////////////////////////////////////////////////////////////////////
// React
//
import React from 'react';

//////////////////////////////////////////////////////////////////////////////
// Third Party
//
import {createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////////////////////////////////////////////////////////////////
// NavItem
//
class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return null;
    }
}
NavItem.propTypes = {
    component: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    iconId: PropTypes.string,
};

//////////////////////////////////////////////////////////////////////////////
// BottomTabNavigator
//
export default class BottomTabNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const Nav = createBottomTabNavigator(
            genRouteConfigs(this.props.children),
            genBottomTabNavigatorConfig(this.props.defaultActiveNavItem)
        );

        return (
            <Nav/>
        );
    }
}
BottomTabNavigator.propTypes = {
    defaultActiveNavItem: PropTypes.string.isRequired,
};

BottomTabNavigator.NavItem = NavItem;

//////////////////////////////////////////////////////////////////////////////
// utils
//
function genRouteConfigs(navItems) {

    let config = navItems.reduce((config, item) => {

        const {name, component, title, iconId} = item.props;

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