import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableNativeFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

class Baogong extends Component {

    handleGoBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{
                display: "flex",
                flexDirection: "column"
            }}>
                {/*标题*/}
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

                    <Text style={{flex:1, color: "#ffffff", fontSize:20, textAlign:"center"}}>报工</Text>
                </View>

                {/*主体*/}
                <View style={{
                    flexGrow: 1
                }}>
                    <Text>报工</Text>
                </View>
            </View>
        );
    }
}
export default withNavigation(connect(
    ({contactList}) => ({contactList}),
    (dispatch) => ({dispatch})
)(Baogong));