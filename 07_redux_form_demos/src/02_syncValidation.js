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
import {Field, reduxForm} from 'redux-form'

// ## antd
import 'antd/dist/antd.css';
import {Spin, Input} from 'antd';

// ## util
import {delay} from "./utils";

/////////////////////////////////////////////////////////////////////////////
// Form Validate
//
const validate = values => {
    const errors = {}

    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }

    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

/////////////////////////////////////////////////////////////////////////////
// Form
//
@reduxForm({
    form: 'syncValidation', // Form 唯一标识
    validate,               // Form Error级验证函数
    warn,                   // Form Warn级验证函数
    onSubmit: (values) => {
        return delay(2000).then(() => {
            alert(JSON.stringify(values))
        });
    }
})
class SyncValidationForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
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

                        <Field name="age" type="number" component={renderField} label="Age"/>

                        <div style={{textAlign: "center"}}>
                            <button type="submit" disabled={submitting}>
                                Submit
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
// Form Field
//
const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
const labelStyle = {width:120, textAlign:"right"};

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <Input {...input} placeholder={label} type={type} style={{width: 250}}/>
            {touched &&
            ((error && <div>{error}</div>) ||
                (warning && <div>{warning}</div>))}
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
        <SyncValidationForm/>
    </Provider>,
    document.getElementById('app')
);

