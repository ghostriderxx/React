/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## Framework
import {
    reaper,
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

// ## APP
import {modelApp} from "./app/App"
import {modelCachetMng} from "./app/cachetMng/CachetMng"
import {modelResCachetTypeAdd} from "./app/cachetMng/ResCachetTypeAdd"



const app = reaper(reaperLoading());

// 框架级模型
app.model(require('./framework/taglib/lane/_modelLane').default);

export default {
    addModel: (model)=>{ app.model(model) },
};

// 业务级模型
app.model(modelApp);
app.model(modelCachetMng);
app.model(modelResCachetTypeAdd);

// 框架启动页
app.router(({app, history}) => {
    return (
        <ConnectedRouter history={history}>
            <Route component={(props) => <LaneContainer {...props} mainBeacon={App}/>}/>
        </ConnectedRouter>
    );
});
app.start('#app');
