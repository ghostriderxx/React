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
// App
//
import App from "./app/App";
import modelCachetMng from "./app/cachetMng/modelCachetMng";
/////////////////////////////////////////////////////////////////////////////


let reducers = {
    [modelCachetMng.namespace]: modelCachetMng.reducer
};

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    connectRouter(history)(combineReducers(reducers)),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
        )
    )
);

sagaMiddleware.run(modelCachetMng.effect);

/////////////////////////////////////////////////////////////////////////////

const Frame = {
    // 追加Reducer
    addReducer(namespace, reducer){
        reducers = {
            ...reducers,
            [namespace]:reducer,
        }

        store.replaceReducer(
            connectRouter(history)(combineReducers(reducers)),
        );
    },
    // 追加Saga
    addSaga(saga){
        sagaMiddleware.run(saga);
    }
};
export default Frame;

/////////////////////////////////////////////////////////////////////////////

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);