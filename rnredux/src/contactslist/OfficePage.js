import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

class OfficePage extends Component {

    componentDidMount(){

    }

    gotoBaogong = () => {
        this.props.navigation.navigate("Baogong");
    }

    render(){
        return (
            <View style={{
                display: "flex"
            }}>
                {/** 标题 **/}
                <View style={{
                    height: 50,
                    backgroundColor:"#000000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{color: "#ffffff", fontSize:20}}>办公</Text>
                </View>

                {/** 主体 **/}
                <View>
                    {/** 工作 **/}
                    <View>
                        <View style={{backgroundColor:"#f1fffd", height:30, display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                            <Text style={{fontSize: 16}}>工作</Text>
                        </View>

                        <View style={{marginTop:20, marginBottom:20, display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                            <TouchableNativeFeedback onPress={()=>{this.gotoBaogong()}}>
                                <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                    <Ionicons name={"logo-github"} size={40}/>
                                    <Text>报工</Text>
                                </View>
                            </TouchableNativeFeedback>

                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name={"ios-cafe"} size={40}/>
                                <Text>会议室</Text>
                            </View>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Text></Text>
                            </View>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Text></Text>
                            </View>
                        </View>
                    </View>

                    {/** 管理 **/}
                    <View>
                        <View style={{backgroundColor:"#f1fffd", height:30, display:"flex", flexDirection:"row", justifyContent:"flex-start", alignItems:"center"}}>
                            <Text style={{fontSize: 16}}>管理</Text>
                        </View>

                        <View style={{marginTop:20, marginBottom:20, display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name={"ios-headset"} size={40}/>
                                <Text>资质</Text>
                            </View>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name={"ios-umbrella"} size={40}/>
                                <Text>请假</Text>
                            </View>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name={"ios-bus"} size={40}/>
                                <Text>加班车</Text>
                            </View>
                            <View style={{width:60, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                <Ionicons name={"ios-ionitron"} size={40}/>
                                <Text>培训计划</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default withNavigation(OfficePage);