/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## Framework
import {
    reaper,
    dynamic,
    reaperLoading
} from './framework/core';

import {
    LaneContainer
} from "./framework/taglib";


import {
    ConnectedRouter,
} from "react-router-redux";
import {Route} from "react-router-dom"
import 'antd/dist/antd.css';
import App from "./app/App";
import { message } from 'antd';

// ## APP
import {modelApp} from "./app/App"
import {modelCachetMng} from "./app/cachetMng/CachetMng"
import {modelResCachetAdd} from "./app/cachetMng/ResCachetAdd"
import {modelResCachetModify} from "./app/cachetMng/ResCachetModify"
import {modelResCachetTypeAdd} from "./app/cachetMng/ResCachetTypeAdd"
import {modelResCachetTypeModify} from "./app/cachetMng/ResCachetTypeModify"


const app = reaper({
    ...reaperLoading(),
    onError(e) {
        if(e.errortype == 1){ // BusinessExcetpion
            alert(e.message);
        }else if(e.errortype == 2){ // AppException
            message.error(e.message, /* duration */10);
        }else{ // Ohter(NetworkError .... 等)
            message.error(e.message, /* duration */10);
        }
    },
});

// 框架级模型
app.model(require('./framework/taglib/lane/_modelLane').default);

const cached = {}; // 避免模型的多次注入，为什么会多次注入。。。我还不太明白。。参考的是dynamic.js
export default {
    getComponent: (biz, zjm) => {
        return dynamic({
            app,
            component: () => import(`./${zjm}`)
        });
    },
    addModel: (model)=>{
        if (!cached[model.namespace]) {
            app.model(model);
            cached[model.namespace] = 1;
        }
    },
};

// 业务级模型
app.model(modelApp);
app.model(modelCachetMng);
app.model(modelResCachetAdd);
app.model(modelResCachetModify);
app.model(modelResCachetTypeAdd);
app.model(modelResCachetTypeModify);

// 框架启动页
app.router(({app, history}) => {
    return (
        <ConnectedRouter history={history}>
            <Route component={(props) => <LaneContainer {...props} mainBeacon={App}/>}/>
        </ConnectedRouter>
    );
});
app.start('#app');
