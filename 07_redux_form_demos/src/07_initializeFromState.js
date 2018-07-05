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
// Account
//
const accountReducer = (state = {}, action) => {

    const {type, payload} = action;

    switch (type) {
        case "LOAD_ACCOUNT_DATA":
            return {
                data: payload
            };
        default:
            return state;
    }
};

/////////////////////////////////////////////////////////////////////////////
// Form Field Render Function
//
const rowStyle = {display: "flex", justifyContent: "flex-start", alignItems: "center", marginBottom: 10};
const labelStyle = {width: 120, textAlign: "right"};

const renderInputField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <Input {...input} placeholder={label} type={type}/>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
);

const renderTextAreaField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            <textarea {...input}/>
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
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

const renderRadioAreaField = ({input, label, name,  code, meta: {touched, error, warning}}) => (
    <div style={rowStyle}>
        <label style={labelStyle}>{label}：</label>
        <div>
            {code.map(([codeValue,codeContent]) => (
                <span>
                    <input {...input} type={"radio"} name={name} value={codeValue}/>
                    {codeContent}
                </span>
            ))}
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
);

/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// 将需要作为 Form 表单初始值的数据，映射到组件的 props.initialValues 属性中
// reduxForm 会自动把 connect() 注入到组件中的 initialValues 字段填充到 Form 表单中
@connect(
    ({account}) => ({initialValues: account.data})
)
@reduxForm({
    form: 'initializeFromState',
    onSubmit: (values) => {
        return delay(2000).then(() => {
            alert(JSON.stringify(values))
        });
    }
})
class InitializeFromStateForm extends React.Component {
    constructor(props) {
        super(props);
    }

    // 加载账户信息
    loadAccountData = () => {
        const data = {
            // used to populate "account" reducer when "Load" is clicked
            firstName: 'Jane',
            lastName: 'Doe',
            age: '42',
            sex: 'female',
            employed: true,
            favoriteColor: 'Blue',
            bio: 'Born to write amazing Redux code.'
        };

        this.props.dispatch({
            type: "LOAD_ACCOUNT_DATA",
            payload: data,
        });
    }


    render() {
        const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
                <Spin spinning={submitting}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <button type="button" onClick={this.loadAccountData}>
                                Load Account
                            </button>
                        </div>

                        <Field
                            name="firstName"
                            component={renderInputField}
                            type="text"
                            label={"FirstName"}/>

                        <Field
                            name="lastName"
                            component={renderInputField}
                            type="text"
                            label={"LastName"}/>

                        <Field
                            name="age"
                            component={renderInputField}
                            type="number"
                            label={"Age"}/>


                        <Field
                            name="sex"
                            component={renderRadioAreaField}
                            label={"Sex"}
                            code={[["male","Male"], ["female","Female"]]}/>

                        <Field
                            name="favoriteColor"
                            component={renderSelectAreaField}
                            label={"Favorite Color"}
                            code={colors}/>

                        <Field
                            name="employed"
                            component={renderInputField}
                            type="checkbox"
                            label={"Employed"}/>

                        <Field
                            name="bio"
                            component={renderTextAreaField}
                            label={"Bio"}/>

                        <div>
                            <button type="submit" disabled={pristine || submitting}>Submit</button>
                            <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes</button>
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
    account: accountReducer,
    form: reduxFormReducer // mounted under "form"
});

const storeEnhancer = composeWithDevTools();

const store = createStore(rootReducer, storeEnhancer);

ReactDOM.render(
    <Provider store={store}>
        <InitializeFromStateForm/>
    </Provider>,
    document.getElementById('app')
);