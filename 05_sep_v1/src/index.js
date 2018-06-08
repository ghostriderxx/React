// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'

// Router
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router'

// Redux-Saga
import createSagaMiddleware from 'redux-saga'

// Redux-Dev-Extension
import { composeWithDevTools } from 'redux-devtools-extension';

/////////////////////////////////////////////////////////////////////////////
// Framework
//
import 'antd/dist/antd.css';

/////////////////////////////////////////////////////////////////////////////

import App from "./app/App";

/////////////////////////////////////////////////////////////////////////////

const rootReducer = arg => arg;


const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(
        routerMiddleware(history),
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);