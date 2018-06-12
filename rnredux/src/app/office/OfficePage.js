//////////////////////////////////////////////////////////////////////////////
// React
//
import React from 'react';
import {
    Text,
    View,
    TouchableNativeFeedback,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


//////////////////////////////////////////////////////////////////////////////
// Framework
//
import Panel from "../../framework/taglib/panel/Panel";
import Label from "../../framework/taglib/form/label/Label";


//////////////////////////////////////////////////////////////////////////////
// Component
//
import TopTitle from "../common/toptitle/TopTitle";

class OfficePage extends React.Component {
    constructor(props){
        super(props);
    }

    gotoBaogong = () => {
        this.props.navigation.navigate("Baogong");
    }

    gotoZizhi = () => {
        this.props.navigation.navigate("Zizhi");
    }

    render(){
        return (
            <Panel>
                {/** 标题 **/}
                <TopTitle>办公</TopTitle>

                {/** 工作 **/}
                <Panel>
                    <View style={{backgroundColor:"#f1fffd", height:30, display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                        <Label fontSize={16}>工作</Label>
                    </View>

                    <View style={{marginTop:20, marginBottom:20, display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                        {/** 报工 **/}
                        <TouchableNativeFeedback onPress={()=>{this.gotoBaogong()}}>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name={"logo-github"} size={40}/>
                                <Label>报工</Label>
                            </View>
                        </TouchableNativeFeedback>

                        <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <Ionicons name={"ios-cafe"} size={40}/>
                            <Label>会议室</Label>
                        </View>
                        <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <Label></Label>
                        </View>
                        <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <Label></Label>
                        </View>
                    </View>
                </Panel>

                {/** 管理 **/}
                <Panel>
                    <View style={{backgroundColor:"#f1fffd", height:30, display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                        <Label fontColor={16}>管理</Label>
                    </View>

                    <View style={{marginTop:20, marginBottom:20, display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                        {/** 资质 **/}
                        <TouchableNativeFeedback onPress={()=>{this.gotoZizhi()}}>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name={"ios-headset"} size={40}/>
                                <Label>资质</Label>
                            </View>
                        </TouchableNativeFeedback>

                        <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <Ionicons name={"ios-umbrella"} size={40}/>
                            <Label>请假</Label>
                        </View>
                        <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <Ionicons name={"ios-bus"} size={40}/>
                            <Label>加班车</Label>
                        </View>
                        <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                            <Ionicons name={"ios-ionitron"} size={40}/>
                            <Label>培训计划</Label>
                        </View>
                    </View>
                </Panel>
            </Panel>
        );
    }
}

export default withNavigation(OfficePage);