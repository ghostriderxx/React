/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

// ## Redux
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

// ## Saga
import createSagaMiddleware from 'redux-saga'

// ## Route
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
} from "react-router-redux";
import { createBrowserHistory } from 'history'
import { Route } from "react-router";

// ## Devtools
import { composeWithDevTools } from 'redux-devtools-extension';

// ## AntDesign
import 'antd/dist/antd.css';

// ## App's Reducer
import userAddReducer from './reducer/userAdd'
import userEditReducer from "./reducer/userEdit"
import userMngReducer from './reducer/userMng'

// ## App's Saga
import userAddSaga from "./saga/userAdd"
import userEditSaga from "./saga/userEdit"
import userMngSaga from "./saga/userMng"

// ## App:'s Component
import UserMng from "./component/UserMng"

/////////////////////////////////////////////////////////////////////////////
// Starter
//
const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    userAdd: userAddReducer,
    userEdit: userEditReducer,
    userMng: userMngReducer,
    router: routerReducer,
});

const storeEnhancer = composeWithDevTools(
    applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
    )
);

const store = createStore(rootReducer, storeEnhancer);

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