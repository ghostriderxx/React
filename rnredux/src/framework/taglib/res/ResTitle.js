import PropTypes from 'prop-types';

//////////////////////////////////////////////////////////////////////////////
// React、ReactNative
//
import React from "react";
import {
    View,
    TouchableNativeFeedback,
    Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';

//////////////////////////////////////////////////////////////////////////////
// Third Party
//
import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////////////////////////////////////////////////////////////////
// Panel
//
class ResTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    handleGoBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {title} = this.props;

        return (
            <View style={{
                height: 50,
                backgroundColor:"#000000",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <TouchableNativeFeedback onPress={()=>{this.handleGoBack()}}>
                    <View style={{width:30}}>
                        <Ionicons style={{marginLeft:10}} name="ios-arrow-back" color="#ffffff" size={30}></Ionicons>
                    </View>
                </TouchableNativeFeedback>

                <Text style={{flex:1, color: "#ffffff", fontSize:20, textAlign:"center"}}>{title}</Text>
            </View>
        );
    }
}
ResTitle.propTypes = {
    title: PropTypes.string,
};

export default withNavigation(ResTitle);