/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';

// ## Framework
import {
    reaper,
    dynamic,
    reaperLoading,
    reaperDefer,
} from './framework/core';

// 使用redux-form管理form表单；
import {reducer as reduxFormReducer} from 'redux-form'

import {
    LaneContainer
} from "./framework/taglib";

import BusinessException from "./framework/exception/BusinessException";
import AppException from "./framework/exception/AppException";

import {
    ConnectedRouter,
} from "react-router-redux";
import {Route} from "react-router-dom"
import 'antd/dist/antd.css';
import App from "./app/App";
import { message } from 'antd';

// ## APP
import {modelApp} from "./app/App"
// ##sms
import {modelSmsMng} from "./app/smsMng/SmsMng";

import {modelSmsManageLeaf} from "./app/smsMng/SmsManageLeaf"
import {modelResAddSms} from "./app/smsMng/ResAddSms"
import {modelResUpdateSms} from  "./app/smsMng/ResUpdateSms"


const app = reaper();
app.use(reaperLoading());
app.use(reaperDefer());
app.use({
    extraReducers: {
        form: reduxFormReducer,
    }
});
app.use({
    onError(e) {
        if(e instanceof BusinessException){ // BusinessExcetpion
            alert(e.message);
        }else if(e instanceof AppException){ // AppException
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
    deleteModel: (namespace) => {
        app.unmodel(namespace);
        delete cached[namespace];
    }
};

// 业务级模型
app.model(modelApp);

//短信模板
app.model(modelSmsMng);
app.model(modelSmsManageLeaf);
app.model(modelResAddSms);
app.model(modelResUpdateSms);


// 框架启动页
app.router(({app, history}) => {
    return (
        <ConnectedRouter history={history}>
            <Route component={(props) => <LaneContainer {...props} mainBeacon={App}/>}/>
        </ConnectedRouter>
    );
});
app.start('#app');
