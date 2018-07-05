import {connect as ReduxConnect} from "react-redux";
import reaper from "./reaper";
import dynamic from "./reaper/dynamic";
import reaperLoading  from "./reaper-loading/index";
import  Rui from  "./Rui";


function connect(namespace){
    return (Component) => {
        return ReduxConnect(
            (state) => ({[namespace]:state[namespace]})
        )(Component);
    }
}

export {
    connect,
    reaper,
    dynamic,
    reaperLoading,
    Rui
}