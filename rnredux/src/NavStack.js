import IndexPage from './contactslist/IndexPage'
import ContactDetail from './contactslist/ContactDetail'
import { createStackNavigator } from 'react-navigation';

// Components
import Baogong from "./contactslist/office/Baogong";
import Zizhi from "./contactslist/office/Zizhi";
import GongsiZizhi from "./contactslist/office/GongsiZizhi";
import GongsiZizhiDetail from "./contactslist/office/GongsiZizhiDetail";


const NavStack = createStackNavigator({
    IndexPage: IndexPage,
    ContactDetail: ContactDetail,
    Baogong: Baogong,
    Zizhi: Zizhi,
    GongsiZizhi: GongsiZizhi,
    GongsiZizhiDetail: GongsiZizhiDetail
}, {
    initialRouteName: 'IndexPage',
    headerMode: "none",
});

export default NavStack;