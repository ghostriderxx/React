// React、Redux、Router
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

const history = createHistory();

// rootReducer
import rootReducer from './reducer/index'

// rootSaga
import rootSaga from './saga/index'

// rootComponent
import UserMngApp from "./component/UserMngApp"

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <UserMngApp/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);