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
import {Field, reduxForm, submit, formValueSelector} from 'redux-form'

// ## util
import {delay} from "./utils";

// ## antd
import 'antd/dist/antd.css';
import {Spin, Input, Checkbox} from 'antd';

/////////////////////////////////////////////////////////////////////////////
// Form Field
//
const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
const labelStyle = {width: 120, textAlign: "right"};

const renderInputField = ({input, label, type, meta: {touched, error}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <Input {...input} placeholder={label} type={type}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const renderCheckboxField = ({input, label, type, meta: {touched, error}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <Checkbox {...input} placeholder={label}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
);

const renderSelectAreaField = ({input, label, code, meta: {touched, error, warning}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <select {...input}>
                <option value="">请选择...</option>
                {code.map(colorOption => (
                    <option value={colorOption} key={colorOption}>
                        {colorOption}
                    </option>
                ))}
            </select>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
);

/////////////////////////////////////////////////////////////////////////////
// Form
//
const selector = formValueSelector('selectingFormValues'); // <-- same as form name

@connect(state => {
    // can select values individually
    const hasEmailValue = selector(state, 'hasEmail');
    const favoriteColorValue = selector(state, 'favoriteColor');
    // or together as a group
    const {firstName, lastName} = selector(state, 'firstName', 'lastName');
    return {
        hasEmailValue,
        favoriteColorValue,
        fullName: `${firstName || ''} ${lastName || ''}`
    }
})
@reduxForm({
    form: 'selectingFormValues', // a unique identifier for this form
    onSubmit: (values) => {
        return delay(2000).then(() => {
            alert(JSON.stringify(values))
        });
    }
})
class SelectingFormValuesForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            favoriteColorValue,
            fullName,
            handleSubmit,
            hasEmailValue,
            pristine,
            reset,
            submitting
        } = this.props;

        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Spin spinning={submitting}>
                    <form onSubmit={handleSubmit}>


                        <Field
                            name="firstName"
                            component={renderInputField}
                            type="text"
                            label={"First Name"}/>

                        <Field
                            name="lastName"
                            component={renderInputField}
                            type="text"
                            label={"Last Name"}/>

                        <Field
                            name="hasEmail"
                            component={renderCheckboxField}
                            label={"Has Email?"}/>

                        {hasEmailValue && (
                            <Field
                                name="email"
                                component={renderInputField}
                                type="email"
                                label={"Email"}/>
                        )}

                        <Field
                            name="favoriteColor"
                            component={renderSelectAreaField}
                            code={['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']}
                            label={"favorite Color"}/>
                        {favoriteColorValue && (
                            <div style={{
                                    height: 80,
                                    width: 200,
                                    margin: '10px auto',
                                    backgroundColor: favoriteColorValue
                                }}/>
                        )}


                        <div>
                            <button type="submit" disabled={pristine || submitting}>
                                Submit {fullName}
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
            <SelectingFormValuesForm/>
        </div>
    </Provider>,
    document.getElementById('app')
);
