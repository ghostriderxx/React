//////////////////////////////////////////////////////////////////////////////
// React
import React from 'react';

//////////////////////////////////////////////////////////////////////////////
// Reaper
import reaper from './framework/reaper';
import {
    ConnectedRouter,
} from "react-router-redux";
import {Route} from "react-router-dom"

/////////////////////////////////////////////////////////////////////////////
// Framework
//
import 'antd/dist/antd.css';
import {
    LaneContainer
} from "./framework/taglib";
import App from "./app/App";

const app = reaper();

// 框架级模型
app.model(require('./framework/taglib/lane/_modelLane').default);

export default {
    addModel: (model)=>{ app.model(model) },
};

// 业务级模型
app.model(require('./app/cachetMng/_modelCachetMng').default);
app.model(require('./app/cachetMng/_modelResCachetAdd').default);

// 框架启动页
app.router(({app, history}) => {
    return (
        <ConnectedRouter history={history}>
            <Route component={(props) => <LaneContainer {...props} mainBeacon={App}/>}/>
        </ConnectedRouter>
    );
});
app.start('#app');
