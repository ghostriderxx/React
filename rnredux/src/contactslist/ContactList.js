import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ContactList extends Component {

    constructor(props){
        super(props);
        this.state = {
            contact_list_search_text: ""
        }
    }

    componentDidMount(){
        this.props.dispatch({
            type: "FETCH_CONTACTLIST_REQUESTED"
        });
    }

    handleContactListSearchTextChange = (text) => {
        this.setState({contact_list_search_text: text});

        this.props.dispatch({
            type: "SEARCH_CONTACTLIST",
            payload: text
        });
    }

    showContactDetail = (empno) => {
        this.props.dispatch({
            type: "SELECT_CONTACT",
            payload: empno
        });
        this.props.navigation.navigate('ContactDetail')
    }

    _keyExtractor = (item, index) => item.empno;

    render() {

        const searchKey = this.props.contactList.searchKey;
        let contactListFiltered = this.props.contactList.contacts.filter((contact, index) => {
            if(contact.empno.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 ||
                contact.xm.indexOf(searchKey) > -1){
                return true;
            }
            return false;
        })


        return (
            <View style={{
                display: "flex",
                flexDirection: "column",
            }}>
                <ActivityIndicator
                    key={"indicator"}
                    animating={this.props.contactList.loading}
                    size="large"
                    style={{
                        position: "absolute",
                        top: 200,
                        left: 150
                    }}
                />

                <View key={"title"} style={{
                    height: 50,
                    backgroundColor:"#000000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Text style={{color: "#ffffff", fontSize:20}}>通讯录</Text>
                </View>


                <View key={"searchbox"} style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <Ionicons key={"searchIcon"} name={"ios-search"} size={30}/>
                    <TextInput
                        key={"searchInput"}
                        style={{height: 50, flex:1}}
                        placeholder = {`在${this.props.contactList.contacts.length}位联系人中搜索`}
                        onChangeText={(text) => this.handleContactListSearchTextChange(text)}
                        value={this.state.contact_list_search_text}
                    />
                </View>

                <FlatList
                    key={"contactlist"}
                    style={{flexGrow:1}}
                    data={contactListFiltered}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <View
                        style={{
                            flexDirection: 'row',
                            alignItems: "center",
                        }}>

                        <Text key={"xm"} style={{width: 60}} onPress={()=>this.showContactDetail(item.empno)}>{item.xm}</Text>

                        <View key={"info"} style={{flex:1}} onPress={()=>this.showContactDetail(item.empno)}>
                            <Text key={"phone"} style={{}} onPress={()=>this.showContactDetail(item.empno)}>{item.phone}</Text>
                            <Text key={"email"} style={{}} onPress={()=>this.showContactDetail(item.empno)}>{item.email} {item.department}</Text>
                        </View>

                        <View key={"icons"} style={{flex:0}}>
                            <Image key={"phone"} style={{width:25, height:25, marginRight:10}} source={require('./images/lianxidianhua.png')} />
                            <Image key={"sms"} style={{width:25, height:25, marginRight:10}} source={require('./images/xiaoxi.png')} />
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