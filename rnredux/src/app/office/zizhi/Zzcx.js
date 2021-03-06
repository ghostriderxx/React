//////////////////////////////////////////////////////////////////////////////
// React、Redux
//
import React from 'react';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

// 这个页面没分离干净。。。暂时先不分离了。。。
import {
    Text,
    View,
    TouchableNativeFeedback,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Panel from "../../../framework/taglib/panel/Panel";
import ResTitle from "../../../framework/taglib/res/ResTitle";



function genZZItem(zzType, zzLabel, zzNum){
    return (
        <TouchableNativeFeedback onPress={() => {
            this.toZZName(zzType)
        }}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: 40,
            }}>
                <Text style={{fontSize: 16}}>●{zzLabel}</Text>
                <Text style={{flex: 1, fontSize: 16, textAlign: "right"}}>{zzNum}</Text>
                <Ionicons style={{marginLeft: 10}} name="ios-arrow-forward" color="#ffffff"
                          size={30}></Ionicons>
            </View>
        </TouchableNativeFeedback>
    );
}


class Zzcx extends React.Component {

    constructor(props){
        super(props);
        genZZItem = genZZItem.bind(this);
    }

    componentDidMount() {
        this.props.dispatch({
            type: "zzcx/FETCH_ZZNUMS_REQUESTED"
        });
    }

    toZZName = (type) => {
        if(type == 2){
            this.props.navigation.navigate("GrZztitle", {
                type
            });
        }else{
            this.props.navigation.navigate("Zztitle", {
                type
            });
        }
    }

    render() {
        const {gszz, grzz, rjcpzs, zzq, gshj, grry, zl} = this.props.zzcx.zzNums;

        return (
            <Panel>
                <ResTitle title={"资质"}/>

                {genZZItem(1, "公司资质", gszz)}
                {genZZItem(2, "个人资质", grzz)}
                {genZZItem(3, "软件产品证书", rjcpzs)}
                {genZZItem(4, "著作权", zzq)}
                {genZZItem(5, "公司获奖", gshj)}
                {genZZItem(6, "个人荣誉", grry)}
                {genZZItem(7, "专利", zl)}
            </Panel>
        );
    }
}

export default withNavigation(connect(
    ({zzcx}) => ({zzcx}),
    (dispatch) => ({dispatch})
)(Zzcx));