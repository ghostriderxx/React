import PrintTplMng from "../printTplMng/PrintTplMng";
import SmsMng from "../smsMng/SmsMng";
import CachetMng from "../cachetMng/CachetMng";


const MENUBAR_CONFIG = [{
    id: "printTplMng",
    text: "打印管理",
    path: "/printTplMng",
    component: PrintTplMng
},{
    id: "smsMng",
    text: "短信模板管理",
    path: "/smsMng",
    component: SmsMng
},{
    id: "cacheMng",
    text: "章管理",
    path: "/cacheMng",
    component: CachetMng
},];

export default MENUBAR_CONFIG;