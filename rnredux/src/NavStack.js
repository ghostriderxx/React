import IndexPage from './contactslist/IndexPage'
import ContactDetail from './contactslist/ContactDetail'
import { createStackNavigator } from 'react-navigation';

// Components
import Baogong from "./contactslist/office/Baogong";
import Zizhi from "./contactslist/office/Zizhi";

const NavStack = createStackNavigator({
    IndexPage: IndexPage,
    ContactDetail: ContactDetail,
    Baogong: Baogong,
    Zizhi: Zizhi
}, {
    initialRouteName: 'IndexPage',
    headerMode: "none",
});

export default NavStack;