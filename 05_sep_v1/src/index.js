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

/////////////////////////////////////////////////////////////////////////////


let reducers = {
    noop: arg => arg
};

const history = createBrowserHistory();

const store = createStore(
    connectRouter(history)(combineReducers(...reducers)),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            createSagaMiddleware(),
        )
    )
);

/////////////////////////////////////////////////////////////////////////////

const App = {
    // 追加Reducer
    addReducer(namespace, reducer){
        reducers = {
            ...reducers,
            [namespace]:reducer,
        }

        store.replaceReducer(
            combineReducers({
                ...finalReducers
            }),
        );
    },

    // 追加Saga
    addSaga(saga){
        sagaMiddleware.run(saga);
    }
};
export default App;

/////////////////////////////////////////////////////////////////////////////

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);