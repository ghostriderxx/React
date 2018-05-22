import IndexPage from './contactslist/IndexPage'
import ContactDetail from './contactslist/ContactDetail'
import { createStackNavigator } from 'react-navigation';
import Baogong from "./contactslist/office/Baogong";

const NavStack = createStackNavigator({
    IndexPage: IndexPage,
    ContactDetail: ContactDetail,
    Baogong: Baogong
}, {
    initialRouteName: 'IndexPage',
    headerMode: "none",
});

export default NavStack;