import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

// Reducer
import rootReducer from './reducer/FilterReducer'

// rootSaga
import rootSaga from './saga/FilterSaga'

// Component
import Filter from "./component/Filter"

const sagaMiddleware = createSagaMiddleware();

// Store
let store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

// run saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Filter/>
    </Provider>,
    document.getElementById('app')
);