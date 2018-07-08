/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react'
import ReactDOM from 'react-dom'

// ## Redux
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

// ## Devtools
import {composeWithDevTools} from "redux-devtools-extension";

// ## redux-form
import {reducer as reduxFormReducer} from 'redux-form'
import {Field, reduxForm, submit, SubmissionError} from 'redux-form'

// ## util
import {delay} from "./utils";

// ## antd
import 'antd/dist/antd.css';
import {Spin, Input} from 'antd';


/////////////////////////////////////////////////////////////////////////////
// Form Field
//
const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
const labelStyle = {width: 120, textAlign: "right"};

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <Input {...input} placeholder={label} type={type}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);


/////////////////////////////////////////////////////////////////////////////
// Form
//
@reduxForm({
    form: 'submitValidation', // a unique identifier for this form
})
class SubmitValidationForm extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = (values) => {
        return delay(1000).then(() => {
            // simulate server latency
            if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
                throw new SubmissionError({
                    username: 'User does not exist',
                    _error: 'Login failed!'
                })
            } else if (values.password !== 'redux-form') {
                throw new SubmissionError({
                    password: 'Wrong password',
                    _error: 'Login failed!'
                })
            } else {
                window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            }
        })
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting} = this.props
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Spin spinning={submitting}>
                    <form onSubmit={handleSubmit(this.submit)}>
                        <Field
                            name="username"
                            type="text"
                            component={renderField}
                            label="Username"
                        />
                        <Field
                            name="password"
                            type="password"
                            component={renderField}
                            label="Password"
                        />
                        {error && <strong>{error}</strong>}
                        <div>
                            <button type="submit" disabled={submitting}>
                                Log In
                            </button>
                            <button type="button" disabled={pristine || submitting} onClick={reset}>
                                Clear Values
                            </button>
                        </div>
                    </form>
                </Spin>
            </div>
        )
    }
}

/////////////////////////////////////////////////////////////////////////////
// Start
//
const rootReducer = combineReducers({
    form: reduxFormReducer // mounted under "form"
});

const storeEnhancer = composeWithDevTools();

const store = createStore(rootReducer, storeEnhancer);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <SubmitValidationForm/>
        </div>
    </Provider>,
    document.getElementById('app')
);