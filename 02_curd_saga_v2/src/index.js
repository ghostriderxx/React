// React、Redux、Router、devtools
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { BrowserRouter as Router} from "react-router-dom";

import { composeWithDevTools } from 'redux-devtools-extension';


// rootReducer
import bizReducers from './reducer/index'

// rootSaga
import rootSaga from './saga/index'

// rootComponent
import UserMngApp from "./component/UserMngApp"

const sagaMiddleware = createSagaMiddleware();





let finalReducers = {
    ...bizReducers
};

let store = createStore(
    combineReducers({
        ...finalReducers
    }),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

// 导出用的
const App = {
    // 追加Reducer
    addReducer(namespace, reducer){
        finalReducers = {
            ...finalReducers,
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


sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <UserMngApp/>
        </Router>
    </Provider>,
    document.getElementById('app')
);