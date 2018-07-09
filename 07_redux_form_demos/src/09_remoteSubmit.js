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
// RemoteSubmitButton
//
@connect()
class RemoteSubmitButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button type="button"
                    style={{
                        padding: '10px 20px',
                        width: 140,
                        display: 'block',
                        margin: '20px auto',
                        fontSize: '16px'
                    }}
                    onClick={() => this.props.dispatch(submit('remoteSubmit'))}>Submit</button>
        )
    }
}

/////////////////////////////////////////////////////////////////////////////
// Form
//
@reduxForm({
    form: 'remoteSubmit',   // a unique identifier for this form
    onSubmit: (values) => { // submit function must be passed to onSubmit
        return delay(1000).then(() => {
            // simulate server latency
            if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
                throw new SubmissionError({
                    username: 'User does not exist',
                    _error: '登录失败!'
                })
            } else if (values.password !== 'redux-form') {
                throw new SubmissionError({
                    password: 'Wrong password',
                    _error: '登录失败!'
                })
            } else {
                alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            }
        })
    }
})
class RemoteSubmitForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {error, handleSubmit, submitting} = this.props;
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Spin spinning={submitting}>
                    <form onSubmit={handleSubmit}>
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
                        {error && <div style={{textAlign:"center"}}>{error}</div>}
                    </form>
                </Spin>
            </div>
        )
    }
}

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
            <RemoteSubmitForm/>
            <RemoteSubmitButton/>
        </div>
    </Provider>,
    document.getElementById('app')
);