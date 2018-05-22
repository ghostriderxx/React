import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

class ContactList extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.dispatch({
            type: "FETCH_CONTACTLIST_REQUESTED"
        });
    }

    showContactDetail = (empno) => {
        this.props.dispatch({
            type: "SELECT_CONTACT",
            payload: empno
        });
        this.props.navigation.navigate('ContactDetail')
    }

    _keyExtractor = (item, index) => item.key;

    render() {
        return (
            <View style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <ActivityIndicator
                    animating={this.props.contactList.loading}
                    size="large"
                    style={{
                        position: "absolute",
                        top: 200,
                        left: 150
                    }}
                />

                <View style={{
                    height: 50,
                    backgroundColor:"#000000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{color: "#ffffff", fontSize:20}}>通讯录</Text>
                </View>

                <FlatList
                    style={{flexGrow:1}}
                    data={this.props.contactList.contacts}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <View
                        style={{
                            flexDirection: 'row',
                            alignItems: "center",
                        }}>

                        <Text style={{width: 60}} onPress={()=>this.showContactDetail(item.empno)}>{item.xm}</Text>

                        <View style={{flex:1}} onPress={()=>this.showContactDetail(item.empno)}>
                            <Text style={{}} onPress={()=>this.showContactDetail(item.empno)}>{item.phone}</Text>
                            <Text style={{}} onPress={()=>this.showContactDetail(item.empno)}>{item.email} {item.department}</Text>
                        </View>

                        <View style={{flex:0}}>
                            <Image style={{width:25, height:25, marginRight:10}} source={require('./images/lianxidianhua.png')} />
                            <Image style={{width:25, height:25, marginRight:10}} source={require('./images/xiaoxi.png')} />
                        </View>
                    </View>}
                />
            </View>
        );
    }
}

export default withNavigation(connect(
    ({contactList}) => ({contactList}),
    (dispatch) => ({dispatch})
)(ContactList));