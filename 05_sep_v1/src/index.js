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
import {modelCachetMng} from "./app/cachetMng/CachetMng"
import {modelResCachetAdd} from "./app/cachetMng/ResCachetAdd"
import {modelResCachetModify} from "./app/cachetMng/ResCachetModify"
import {modelResCachetTypeAdd} from "./app/cachetMng/ResCachetTypeAdd"
import {modelResCachetTypeModify} from "./app/cachetMng/ResCachetTypeModify"
// ##sms
import {modelSmsMng} from "./app/smsMng/SmsMng";

import {modelSmsManageLeaf} from "./app/smsMng/SmsManageLeaf"
import {modelResAddSms} from "./app/smsMng/ResAddSms"
import {modelResUpdateSms} from  "./app/smsMng/ResUpdateSms"



const {extraReducers, onEffect} = reaperLoading();
const app = reaper({
    extraReducers: {
        form: reduxFormReducer,
        ...extraReducers
    },
    onEffect,
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

// const cached = {}; // 避免模型的多次注入，为什么会多次注入。。。我还不太明白。。参考的是dynamic.js
export default {
    getComponent: (biz, zjm) => {
        return dynamic({
            app,
            component: () => import(`./${zjm}`)
        });
    },
    addModel: (model)=>{
        // if (!cached[model.namespace]) {
            app.model(model);
            // cached[model.namespace] = 1;
        // }
    },
    deleteModel: (model) => {
        app.unmodel(model);
    }
};

// 业务级模型
app.model(modelApp);
app.model(modelCachetMng);
app.model(modelResCachetAdd);
app.model(modelResCachetModify);
app.model(modelResCachetTypeAdd);
app.model(modelResCachetTypeModify);

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
