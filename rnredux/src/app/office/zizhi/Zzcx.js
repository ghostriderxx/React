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

class Zzcx extends Component {

    componentDidMount(){
        this.props.dispatch({
            type: "FETCH_ZIZHILIST_REQUESTED"
        });
    }

    handleGoBack = () => {
        this.props.navigation.goBack();
    }


    handleEnterZizhi = (type) => {
        if(type == "公司资质"){
            this.props.navigation.navigate("GongsiZizhi");
        }else{

        }
    }


    __genViewByZizhiMap(zizhiMap){
        var view = [];
        for(let key in zizhiMap){
            view.push(
                <TouchableNativeFeedback onPress={()=>{this.handleEnterZizhi(key)}}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        height:40,
                    }}>
                    <Text style={{fontSize:16}}>{key}</Text>
                    <Text style={{flex:1, fontSize:16, textAlign:"right"}}>{zizhiMap[key]}</Text>
                    <Ionicons style={{marginLeft:10}} name="ios-arrow-forward" color="#ffffff" size={30}></Ionicons>
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return view;
    }


    render() {
        // 数据统计
        let zizhiList = this.props.zizhi.zizhiList;
        let zizhiMap = zizhiList.reduce((prevMap, curZizhi)=>{
            let curType = curZizhi["type"];
            if(curType in prevMap){
                prevMap[curType]++;
            }else{
                prevMap[curType] = 1;
            }
            return prevMap;
        }, {});

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

                    <Text style={{flex:1, color: "#ffffff", fontSize:20, textAlign:"center"}}>资质</Text>
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
                        this.__genViewByZizhiMap(zizhiMap)
                    }
                </View>
            </View>
        );
    }
}
export default withNavigation(connect(
    ({zizhi}) => ({zizhi}),
    (dispatch) => ({dispatch})
)(Zzcx));