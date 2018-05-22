import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

class MyPage extends Component {
    render(){
        return (
            <View style={{
                display:"flex"
            }}>
                <View style={{
                    height: 50,
                    backgroundColor:"#000000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{color: "#ffffff", fontSize:20}}>我</Text>
                </View>

                <View>
                    <Text>我的</Text>
                </View>
            </View>
        );
    }
}

export default MyPage;