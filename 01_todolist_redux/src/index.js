import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import rootReducer from './reducer/index'
import Todolist from "./component/Todolist"

let store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <Todolist/>
    </Provider>,
    document.getElementById('app')
);