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

function genZZItem(key, count, zzlxmc){
    return (
        <TouchableNativeFeedback key={key} onPress={() => {
            this.toZZName(zzlxmc)
        }}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: 40,
            }}>
                <Text style={{fontSize: 16}}>●{zzlxmc}</Text>
                <Text style={{flex: 1, fontSize: 16, textAlign: "right"}}>{Math.floor(count)}</Text>
                <Ionicons style={{marginLeft: 10}} name="ios-arrow-forward" color="#ffffff"
                          size={30}></Ionicons>
            </View>
        </TouchableNativeFeedback>
    );
}


class GrZztitle extends React.Component {

    constructor(props){
        super(props);
        genZZItem = genZZItem.bind(this);
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type');
        this.props.dispatch({
            type: "grzztitle/FETCH_ZZCOUNT_REQUESTED",
            payload: type,
        });
    }

    toZZName = (zzlxmc) => {
        alert(zzlxmc);
    }

    render() {
        const {vdss, type} = this.props.grzztitle;
        return (
            <Panel>
                <ResTitle title={"个人资质"}/>
                {
                    vdss.map((zz, key) => {
                        return genZZItem(key, zz.count, zz.zzlxmc);
                    })
                }
            </Panel>
        );
    }
}

export default withNavigation(connect(
    ({grzztitle}) => ({grzztitle}),
    (dispatch) => ({dispatch})
)(GrZztitle));