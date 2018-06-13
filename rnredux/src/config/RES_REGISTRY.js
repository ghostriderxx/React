import IndexPage from "../app/IndexPage";
import GongsiZizhiDetail from "../app/office/zizhi/GongsiZizhiDetail";
import Baogong from "../app/office/baogong/Baogong";
import ContactDetail from "../app/contactlist/ContactDetail";
import GongsiZizhi from "../app/office/zizhi/GongsiZizhi";
import Zizhi from "../app/office/zizhi/Zizhi";

const RES_REGISTRY = {
    IndexPage: { screen: IndexPage },
    ContactDetail: { screen: ContactDetail },
    Baogong: { screen: Baogong },
    Zizhi: { screen: Zizhi },
    GongsiZizhi: { screen: GongsiZizhi },
    GongsiZizhiDetail: { screen: GongsiZizhiDetail },
};

export default RES_REGISTRY