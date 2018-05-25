import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import rootReducer from './reducer/index'
import TodoApp from "./component/TodoApp"

let store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    document.getElementById('app')
);