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
// Field Normalizer
//
const upper = value => value && value.toUpperCase();

const lower = value => value && value.toLowerCase();

const lessThan = otherField => (value, previousValue, allValues) =>
    parseFloat(value) < parseFloat(allValues[otherField]) ? value : previousValue

const greaterThan = otherField => (value, previousValue, allValues) =>
    parseFloat(value) > parseFloat(allValues[otherField]) ? value : previousValue

const normalizePhone = value => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6,
        10
    )}`
};

/////////////////////////////////////////////////////////////////////////////
// Form
//
@reduxForm({
    form: 'normalizing', // a unique identifier for this form
    initialValues: {min: '1', max: '10'}
})
class FieldNormalizingForm extends React.Component {
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
                            component={renderField}
                            type="text"
                            label="Username"
                            normalize={lower}
                        />

                        <Field
                            name="shout"
                            component={renderField}
                            type="text"
                            label="Shout"
                            normalize={upper}
                        />

                        <Field
                            name="phone"
                            component={renderField}
                            type="text"
                            label="Phone"
                            normalize={normalizePhone}
                        />

                        <Field
                            name="min"
                            component={renderField}
                            type="number"
                            label="Min"
                            normalize={lessThan('max')}
                        />

                        <Field
                            name="max"
                            component={renderField}
                            type="number"
                            label="Max"
                            normalize={greaterThan('min')}
                        />

                        <div>
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
            <FieldNormalizingForm/>
        </div>
    </Provider>,
    document.getElementById('app')
);







