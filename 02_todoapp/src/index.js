// React、Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Reducer
import rootReducer from './reducer/index';

// Component
// import TodoApp from './component/v1/TodoApp';
// import TodoApp from './component/v2/TodoApp';
// import TodoApp from './component/v3/TodoApp';
import TodoApp from './component/v4/TodoApp';

// antd css
import 'antd/dist/antd.css';

// Store
let store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    document.getElementById('app')
);
