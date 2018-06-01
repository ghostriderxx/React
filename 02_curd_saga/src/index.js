// React、Redux、Router
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { BrowserRouter as Router} from "react-router-dom";

// rootReducer
import rootReducer from './reducer/index'

// rootSaga
import rootSaga from './saga/index'

// rootComponent
import UserMngApp from "./component/UserMngApp"

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <UserMngApp/>
        </Router>
    </Provider>,
    document.getElementById('app')
);