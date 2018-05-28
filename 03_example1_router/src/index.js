import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import rootReducer from './reducer/index'
import rootSaga from './saga/index'
import YZMng from "./component/YZMng"

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <YZMng/>
        </Router>
    </Provider>,
    document.getElementById('app')
);