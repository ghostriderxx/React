// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux'

// Router
import {createBrowserHistory} from 'history'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {ConnectedRouter} from 'connected-react-router'
import {Route} from 'react-router'

// Redux-Saga
import createSagaMiddleware from 'redux-saga'

// Redux-Dev-Extension
import {composeWithDevTools} from 'redux-devtools-extension';

/////////////////////////////////////////////////////////////////////////////
// Framework
//
import 'antd/dist/antd.css';
import modelLane from "./framework/taglib/lane/modelLane"
import LaneContainer from "./framework/taglib/lane/LaneContainer";

/////////////////////////////////////////////////////////////////////////////
// App
//
import App from "./app/App";
import modelCachetMng from "./app/cachetMng/modelCachetMng";
import modelResCachetAdd from "./app/cachetMng/modelResCachetAdd"

/////////////////////////////////////////////////////////////////////////////
// Start
//
let reducers = {
    [modelLane.namespace]: modelLane.reducer, // Framework级Reducer
    [modelCachetMng.namespace]: modelCachetMng.reducer,
    [modelResCachetAdd.namespace]: modelResCachetAdd.reducer
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

sagaMiddleware.run(modelLane.effect); // Framework级Saga
sagaMiddleware.run(modelCachetMng.effect);
sagaMiddleware.run(modelResCachetAdd.effect);

/////////////////////////////////////////////////////////////////////////////
// Dynamic
//
const Frame = {
    // 追加Reducer
    addReducer(namespace, reducer) {
        reducers = {
            ...reducers,
            [namespace]: reducer,
        }

        store.replaceReducer(
            connectRouter(history)(combineReducers(reducers)),
        );
    },
    // 追加Saga
    addSaga(saga) {
        sagaMiddleware.run(saga);
    }
};
export default Frame;

/////////////////////////////////////////////////////////////////////////////

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={(props) => <LaneContainer {...props} mainBeacon={App}/>}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);