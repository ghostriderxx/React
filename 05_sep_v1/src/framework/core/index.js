import {connect as ReduxConnect} from "react-redux";
import reaper from "./reaper";
import dynamic from "./reaper/dynamic";
import reaperLoading  from "./reaper-loading/index";
import  Rui from  "./Rui";


function connect(namespace){
    return (Component) => {
        return ReduxConnect(
            (state) => ({[namespace]:state[namespace]}),
            (dispatch) => ({
                invoke: (type, payload)=>{
                    return dispatch({
                        type: `${namespace}/${type}`,
                        payload,
                    });
                },

                closeRES: (params) => {
                    return dispatch({
                        type: `lane/closeRes`,
                        payload: params,
                    });
                },

                openRES: (title, componentPath, width, height, params) => {
                    return dispatch({
                        type: `lane/openRes`,
                        payload: {
                            componentPath,
                            width,
                            title,
                            params
                        },
                    });
                },
            }),
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