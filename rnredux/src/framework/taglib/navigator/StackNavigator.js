import PropTypes from 'prop-types';

//////////////////////////////////////////////////////////////////////////////
// React
//
import React from "react";

//////////////////////////////////////////////////////////////////////////////
// Third Party
//
import {createStackNavigator} from "react-navigation";

export default class StackNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navItems, defaultActiveNavItem} = this.props;

        const Nav = createStackNavigator(navItems, {
            initialRouteName: defaultActiveNavItem,
            headerMode: "none",
        })

        return (
            <Nav/>
        );
    }
}
StackNavigator.propTypes = {
    defaultActiveNavItem: PropTypes.string.isRequired,
    navItems: PropTypes.object,
};