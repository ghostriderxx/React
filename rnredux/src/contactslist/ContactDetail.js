import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableNativeFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

class ContactDetail extends Component {

    handleGoBack = () => {
        this.props.navigation.goBack();
    }


    render() {
        const contacts = this.props.contactList.contacts;
        const selectedContact = this.props.contactList.selectedContact;
        const selectedContactData = contacts.filter((data)=>{
            return data.empno === selectedContact;
        })[0];

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

                    <Text style={{flex:1, color: "#ffffff", fontSize:20, textAlign:"center"}}>个人信息</Text>
                </View>

                {/*主体*/}
                <View style={{
                    flexGrow: 1
                }}>
                    <View style={{
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: "center",
                            backgroundColor: "grey"
                        }}>
                        <Image style={{width:70, height:70, marginLeft:10, borderRadius:70}} source={require('./images/contactDefaultImg.jpg')} />
                        <Text style={{flexGrow:1, paddingLeft:10, fontSize:17}}>{selectedContactData.xm}</Text>
                        <Image style={{width:25, height:25, marginRight:10}} source={require('./images/shoucang.png')} />
                    </View>

                    <View style={{
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: "center",
                            backgroundColor: "grey",
                        }}>
                        <View style={{flexGrow:1}}>
                            <Text style={{paddingLeft:10, fontSize:17}}>{selectedContactData.phone}</Text>
                            <Text style={{paddingLeft:10, fontSize:12, marginTop: 5}}>邮箱: {selectedContactData.email}</Text>
                            <Text style={{paddingLeft:10, fontSize:12, marginTop: 5}}>部门: {selectedContactData.department} </Text>
                        </View>
                        <Image key={1} style={{width:25, height:25, marginRight:10}} source={require('./images/lianxidianhua.png')} />
                        <Image key={2} style={{width:25, height:25, marginRight:10}} source={require('./images/xiaoxi.png')} />
                        <Image key={3} style={{width:25, height:25, marginRight:10}} source={require('./images/youxiang.png')} />
                    </View>
                </View>
            </View>
        );
    }
}
export default withNavigation(connect(
    ({contactList}) => ({contactList}),
    (dispatch) => ({dispatch})
)(ContactDetail));