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
// Field Validate
//
const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);

const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined;
const minValue13 = minValue(13)

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

const tooYoung = value => value && value < 13 ? 'You do not meet the minimum age requirement!' : undefined;

const aol = value => value && /.+@aol\.com/.test(value) ? 'Really? You still use AOL for your email?' : undefined;

const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;

const phoneNumber = value => value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? 'Invalid phone number, must be 10 digits' : undefined;

/////////////////////////////////////////////////////////////////////////////
// Form Field
//
const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
const labelStyle = {width: 120, textAlign: "right"};

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <Input {...input} placeholder={label} type={type}/>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

/////////////////////////////////////////////////////////////////////////////
// Form
//
@reduxForm({
    form: 'fieldLevelValidation',
    onSubmit: (values) => {
        return delay(2000).then(() => {
            alert(JSON.stringify(values))
        });
    }
})
class FieldLevelValidationForm extends React.Component {
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
                            validate={[required, maxLength15, minLength2]}
                            warn={alphaNumeric}
                        />
                        <Field
                            name="email"
                            type="email"
                            component={renderField}
                            label="Email"
                            validate={email}
                            warn={aol}
                        />
                        <Field
                            name="age"
                            type="number"
                            component={renderField}
                            label="Age"
                            validate={[required, number, minValue13]}
                            warn={tooYoung}
                        />
                        <Field
                            name="phone"
                            type="number"
                            component={renderField}
                            label="Phone number"
                            validate={[required, phoneNumber]}
                        />
                        <div>
                            <button type="submit" disabled={submitting}>Submit</button>
                            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
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
        <FieldLevelValidationForm/>
    </Provider>,
    document.getElementById('app')
);

