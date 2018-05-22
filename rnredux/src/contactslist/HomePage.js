import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { withNavigation } from 'react-navigation';

class HomePage extends Component {
    render(){
        return (
            <View>
                <View style={{
                    height: 50,
                    backgroundColor:"#000000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{color: "#ffffff", fontSize:20}}>首页</Text>
                </View>

                <View>
                    <Text>首页</Text>
                </View>
            </View>
        );
    }
}

export default withNavigation(HomePage);