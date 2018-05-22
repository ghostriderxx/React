import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

// Components
import rootReducer from './src/reducers/index';
import contactListSaga from './src/sagas/contactListSaga'
import App from './src/App';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(contactListSaga)

const Index = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};


AppRegistry.registerComponent('rnredux', () => Index);
