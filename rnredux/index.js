import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

// Components
import rootReducer from './src/reducers/index';
import rootSaga from './src/sagas/index'


import App from './src/App';



const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const Index = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};


AppRegistry.registerComponent('rnredux', () => Index);
