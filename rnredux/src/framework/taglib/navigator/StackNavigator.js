import PropTypes from 'prop-types';

//////////////////////////////////////////////////////////////////////////////
// React
//
import React from "react";

//////////////////////////////////////////////////////////////////////////////
// Third Party
//
import {createStackNavigator} from "react-navigation";
import {
    createNavigationPropConstructor,       // handles #1 above
    createNavigationReducer,               // handles #2 above
    createReactNavigationReduxMiddleware,  // handles #4 above
    initializeListeners,                   // handles #4 above
} from 'react-navigation-redux-helpers';

export default function StackNavigator(props){

    const {navItems, defaultActiveNavItem} = props;

    const Nav = createStackNavigator(navItems, {
        initialRouteName: defaultActiveNavItem,
        headerMode: "none",
    });

    const navReducer = createNavigationReducer(Nav);

    const navigationPropConstructor = createNavigationPropConstructor("root");

    const navigation = navigationPropConstructor(
        this.props.dispatch,
        this.props.nav,
    );

    return (
        <Nav navigation={navigation}/>
    );
}
StackNavigator.propTypes = {
    defaultActiveNavItem: PropTypes.string.isRequired,
    navItems: PropTypes.object,
};