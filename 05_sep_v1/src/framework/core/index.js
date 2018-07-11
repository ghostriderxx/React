import React from "react"
import {connect as ReduxConnect} from "react-redux";
import reaper from "./reaper";
import dynamic from "./reaper/dynamic";
import reaperLoading from "./reaper-loading/index";
import Rui from "./Rui";
import ModelNamespaceContext from "../context/ModelNamespaceContext"

export const RUIConnect = (namespace) => (Component) => {
    return ReduxConnect(
        (state) => ({[namespace]: state[namespace]}),
        (dispatch) => ({
            invoke: (type, payload) => {
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
    )(class extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            return <ModelNamespaceContext.Provider value={{modelNamespace:namespace}}>
                <Component {...this.props}/>
            </ModelNamespaceContext.Provider>;
        }
    });
};

export {
    reaper,
    dynamic,
    reaperLoading,
    Rui
}