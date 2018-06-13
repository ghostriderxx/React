// Components
import HomePage from "../app/home/HomePage"
import OfficePage from "../app/office/OfficePage"
import MyPage from "../app/my/MyPage"
import ContactList from "../app/contactlist/ContactList"

const MENUBAR_REGISTRY = [
    {
        component: HomePage,
        name: "Home",
        title: "首页",
        iconId: "ios-home"
    },
    {
        component: ContactList,
        name: "ContactList",
        title: "通讯录",
        iconId: "ios-contacts"
    },
    {
        component: OfficePage,
        name: "OfficePage",
        title: "办公",
        iconId: "ios-home"
    },
    {
        component: MyPage,
        name: "MyPage",
        title: "我",
        iconId: "ios-man"
    },
];

export default MENUBAR_REGISTRY;