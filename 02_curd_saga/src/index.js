import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducer/index'
import rootSaga from './saga/index'
import CURDApp from "./component/CURDApp"

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <CURDApp/>
    </Provider>,
    document.getElementById('app')
);