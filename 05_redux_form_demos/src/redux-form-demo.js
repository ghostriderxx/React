///////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

// ## Redux
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

// ## Redux-Form
import { reducer as formReducer, Field, reduxForm } from 'redux-form'

///////////////////////////////////////////////////////////////////////////////
// UserInfoForm
//
@reduxForm({
    form: 'contact'
})
class UserInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">姓名：</label>
                    <Field name="firstName" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" component="input" type="text" />
                </div>
                <div>
                    <label htmlFor="email">邮箱：</label>
                    <Field name="email" component="input" type="email" />
                </div>
                <button type="submit">提交</button>
            </form>
        );
    }
}

///////////////////////////////////////////////////////////////////////////////
// App
//
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = values => {
        // print the form values to the console
        console.log(values)
    }

    render() {
        return (
            <div>
                <UserInfoForm onSubmit={this.submit}/>
            </div>
        );
    }
}

///////////////////////////////////////////////////////////////////////////////
// Start
//
const rootReducer = combineReducers({
    form: formReducer, // 挂载redux-form的reducer;
});

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);