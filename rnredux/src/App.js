import React from 'react';

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import StackNavigator from "./framework/taglib/navigator/StackNavigator";


//////////////////////////////////////////////////////////////////////////////
// Component
//
import RES_REGISTRY from "./config/RES_REGISTRY";

export default function(){
    return <StackNavigator navItems={RES_REGISTRY} defaultActiveNavItem={'IndexPage'}/>;
};