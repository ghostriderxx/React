// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'

// Saga
import createSagaMiddleware from 'redux-saga'

// Route
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { ConnectedRouter } from 'connected-react-router'

/////////////////////////////////////////////////////////////////////////////////

// rootReducer
import rootReducer from './reducer/index'

// Saga
import userEditSaga from "./saga/userEdit"
import userMng from "./saga/userMng"

// rootComponent
import UserMngApp from "./component/UserMngApp"

const history = createBrowserHistory();


const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
    )
);

sagaMiddleware.run(userMng);
sagaMiddleware.run(userEditSaga);



ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <UserMngApp/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);