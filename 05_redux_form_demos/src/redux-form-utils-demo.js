///////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

// ## Redux
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

// ## Redux-Form-Utils
import { createForm, bindRedux } from './lib/redux-form-utils';









const formConfig = {
    form: 'myForm',
    fields: ['name', 'address', 'gender']
};

const { state: formState, reducer: formReducer } = bindRedux(formConfig);


///////////////////////////////////////////////////////////////////////////////
// Reducer
//
const initialState = {
    foo: 1,
    bar: 2,
    ...formState
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SOME_ACTION_NON_EXISTENT': {
            return {
                foo: 2,
                ...state,
            };
        }

        default:
            return formReducer(state, action);
    }
}

///////////////////////////////////////////////////////////////////////////////
// Reducer
//


///////////////////////////////////////////////////////////////////////////////
// UI
//

@createForm(formConfig)
class Form extends React.Component {
    render() {
        const { clear, clearAll } = this.props;
        const { name, address, gender } = this.props.fields;

        return (
            <div>
                <input type="text" {...name} placeholder="enter your name" />
                <input type="text" {...address} placeholder="enter your address" />
                <select {...gender}>
                    <option>select your gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <div>
                    <button onClick={clear.bind(null, 'name')}>clear name</button>
                    <button onClick={clear.bind(null, 'address')}>clear address</button>
                    <button onClick={clear.bind(null, 'gender')}>clear gender</button>
                    <button onClick={clearAll}>clear all</button>
                </div>
            </div>
        );
    }
}

@connect((state) => ({form: state}))
class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <Form {...this.props.form} dispatch={this.props.dispatch} />
    }
}


///////////////////////////////////////////////////////////////////////////////
// UI
//
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);