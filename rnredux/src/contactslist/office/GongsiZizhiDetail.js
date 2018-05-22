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

class GongsiZizhiDetail extends Component {

    componentDidMount(){
    }

    handleGoBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        let zizhiList = this.props.zizhi.zizhiList;
        let zizhiId = this.props.navigation.getParam("zizhiId");
        let zizhi = zizhiList.filter((zizhi) => zizhi.id == zizhiId)[0];

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

                    <Text style={{flex:1, color: "#ffffff", fontSize:20, textAlign:"center"}}>资质详情</Text>
                </View>

                {/*主体*/}
                <View style={{
                    flexGrow: 1
                }}>
                    <Text style={{fontSize:16}}>资质名称：{zizhi.zzmc}</Text>
                    <Text style={{fontSize:16}}>认定单位：{zizhi.rddw}</Text>
                    <Text style={{fontSize:16}}>认定日期：{zizhi.rdrq}</Text>
                </View>
            </View>
        );
    }
}
export default withNavigation(connect(
    ({zizhi}) => ({zizhi}),
    (dispatch) => ({dispatch})
)(GongsiZizhiDetail));