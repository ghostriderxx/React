// React
import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'

// Router
import { BrowserRouter as Router, Route} from "react-router-dom";

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

const store = createStore(()=>({}));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route component={App} />
        </Router>
    </Provider>,
    document.getElementById('app')
);