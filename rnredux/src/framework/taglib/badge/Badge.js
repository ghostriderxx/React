import PropTypes from 'prop-types';

//////////////////////////////////////////////////////////////////////////////
// React、ReactNative
//
import React from "react";
import {
    View,
    TouchableNativeFeedback
} from 'react-native';

//////////////////////////////////////////////////////////////////////////////
// ThirdParty
//
import Ionicons from 'react-native-vector-icons/Ionicons';


//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Label from "../form/label/Label";

//////////////////////////////////////////////////////////////////////////////
// BadgeItem
//
class BadgeItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return null;
    }
}
BadgeItem.propTypes = {
    label: PropTypes.string.isRequired,
    iconId: PropTypes.string,
    onPress: PropTypes.func,
};

//////////////////////////////////////////////////////////////////////////////
// Badge
//
export default class Badge extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {title} = this.props;

        return (
            <View>
                <View style={{backgroundColor:"#f1fffd", height:30, display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                    <Label fontSize={16}>{title}</Label>
                </View>

                <View style={{marginTop:20, marginBottom:20, display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                    {
                        genBadgeItems(this.props.children)
                    }
                </View>
            </View>
        )
    }
}
Badge.propTypes = {
    title: PropTypes.string,
};

Badge.BadgeItem = BadgeItem;

//////////////////////////////////////////////////////////////////////////////
// utils
//
function genBadgeItems(badgeItemConfigs) {

    let items = badgeItemConfigs.map((item, index) => {

        const {label, iconId, onPress} = item.props;

        return (
            <TouchableNativeFeedback key={index} onPress={onPress}>
                <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <Ionicons name={iconId} size={40}/>
                    <Label>{label}</Label>
                </View>
            </TouchableNativeFeedback>
        );

    }, {});

    return items;
}