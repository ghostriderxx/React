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
import LaneContainer from "./framework/taglib/lane/LaneContainer";

/////////////////////////////////////////////////////////////////////////////
// App
//
import App from "./app/App";

const app = reaper();

export default app;

app.model(require('./framework/taglib/lane/_modelLane').default);

app.model(require('./app/cachetMng/_modelCachetMng').default);


app.router(({app, history}) => {
    return (
        <ConnectedRouter history={history}>
            <Route component={(props) => <LaneContainer {...props} mainBeacon={App}/>}/>
        </ConnectedRouter>
    );
});

// 5. Start
app.start('#app');