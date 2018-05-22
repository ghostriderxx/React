import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableNativeFeedback,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

class GongsiZizhi extends Component {

    componentDidMount(){
    }

    handleGoBack = () => {
        this.props.navigation.goBack();
    }

    handleShowZizhiDetail = (zizhiId) => {
        this.props.navigation.navigate("GongsiZizhiDetail", {
            zizhiId
        });
    }

    render() {
        let zizhiList = this.props.zizhi.zizhiList;

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

                    <Text style={{flex:1, color: "#ffffff", fontSize:20, textAlign:"center"}}>公司资质</Text>
                </View>

                {/*主体*/}
                <View style={{
                    flexGrow: 1
                }}>
                    <ActivityIndicator
                        key={"indicator"}
                        animating={this.props.zizhi.loading}
                        size="large"
                        style={{
                            position: "absolute",
                            top: 200,
                            left: 150
                        }}
                    />

                    {
                        zizhiList.filter((zizhi)=>{
                            if(zizhi.type == "公司资质"){
                                return true;
                            }
                            return false;
                        }).map((zizhi, index)=>{
                            return (
                                <TouchableNativeFeedback key={index} onPress={()=>{this.handleShowZizhiDetail(zizhi.id)}}>
                                    <View style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        height:40,
                                    }}>
                                        <Text style={{fontSize:16}}>{zizhi.zzmc}</Text>
                                        <Text style={{flex:1, fontSize:16, textAlign:"right"}}>{zizhi.rdrq}</Text>
                                        <Ionicons style={{marginLeft:10}} name="ios-arrow-forward" color="#ffffff" size={30}></Ionicons>
                                    </View>
                                </TouchableNativeFeedback>
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}
export default withNavigation(connect(
    ({zizhi}) => ({zizhi}),
    (dispatch) => ({dispatch})
)(GongsiZizhi));