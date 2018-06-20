// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

// Saga
import createSagaMiddleware from 'redux-saga'

// Route
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
} from "react-router-redux";
import { createBrowserHistory } from 'history'
import { Route } from "react-router";

// Devtools
import { composeWithDevTools } from 'redux-devtools-extension';

import 'antd/dist/antd.css';
/////////////////////////////////////////////////////////////////////////////////

// Reducer
import userAdd from './reducer/userAdd'
import userMng from './reducer/userMng'
import userEdit from "./reducer/userEdit"

// Saga
import userEditSaga from "./saga/userEdit"
import userMngSaga from "./saga/userMng"
import userAddSaga from "./saga/userAdd"

// rootComponent
import UserMng from "./component/UserMng"


const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    combineReducers({
        userAdd,
        userMng,
        userEdit,
        router: routerReducer
    }),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
        )
    )
);

sagaMiddleware.run(userMngSaga);
sagaMiddleware.run(userEditSaga);
sagaMiddleware.run(userAddSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={UserMng}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);