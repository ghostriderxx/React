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

class Zztitle extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type');
        this.props.dispatch({
            type: "zztitle/FETCH_ZZTITLE_REQUESTED",
            payload: type,
        });
    }

    genZZItem(zzId, zzTitle, str){
        return (
            <TouchableNativeFeedback key={zzId} onPress={() => {
                this.toZZDetails(zzId)
            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 40,
                }}>
                    <Text style={{fontSize: 16}}>●</Text>
                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                    }}>
                        <Text style={{fontSize: 16}}>{zzTitle}</Text>
                        <Text style={{fontSize: 16}}>{str}</Text>
                    </View>
                    <Ionicons style={{marginLeft: 10}} name="ios-arrow-forward" color="#ffffff"
                              size={30}></Ionicons>
                </View>
            </TouchableNativeFeedback>
        );
    }

    toZZDetails = (zzid) => {
        const type = this.props.navigation.getParam('type');

        if(type == 1){
            this.props.navigation.navigate("ZZDetailsGS", {
                type,
                zzid
            });
        }else if(type == 2){
            this.props.navigation.navigate("ZZDetailsGr", {
                type,
                zzid
            });
        }else if(type == 3){
            this.props.navigation.navigate("ZZDetailsRJCP", {
                type,
                zzid
            });
        }else if(type == 4){
            this.props.navigation.navigate("ZZDetailsZZQ", {
                type,
                zzid
            });
        }else if(type == 5){
            this.props.navigation.navigate("ZZDetailsGSHJ", {
                type,
                zzid
            });
        }else if(type == 6){
            this.props.navigation.navigate("ZZDetailsGRRY", {
                type,
                zzid
            });
        }
    }

    render() {
        const {zzvds, type} = this.props.zztitle;

        const title = zzvds.length ? zzvds[0].title : "";
        return (
            <Panel>
                <ResTitle title={title}/>
                {
                    zzvds.map((zz) => {
                        return this.genZZItem(zz.zzid, zz.zztitle, zz.str);
                    })
                }
            </Panel>
        );
    }
}

export default withNavigation(connect(
    ({zztitle}) => ({zztitle}),
    (dispatch) => ({dispatch})
)(Zztitle));