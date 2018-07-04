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
import {Spin} from 'antd';

// ## util
import {delay} from "./utils";

/////////////////////////////////////////////////////////////////////////////
// Form
//
@reduxForm({
    form: 'simple', // Form 唯一标识
    onSubmit: (values) => {
        return delay(2000).then(() => {
            alert(JSON.stringify(values))
        });
    }
})
class SimpleForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            <div style={{display: "flex", justifyContent:"center"}}>
                <Spin spinning={submitting}>
                    <form onSubmit={handleSubmit}>


                        <div>
                            <label>First Name</label>
                            <div>
                                <Field
                                    name="firstName"
                                    component="input"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Last Name</label>
                            <div>
                                <Field
                                    name="lastName"
                                    component="input"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <div>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Sex</label>
                            <div>
                                <label>
                                    <Field
                                        name="sex"
                                        component="input"
                                        type="radio"
                                        value="male"
                                    />{' '}
                                    Male
                                </label>
                                <label>
                                    <Field
                                        name="sex"
                                        component="input"
                                        type="radio"
                                        value="female"
                                    />{' '}
                                    Female
                                </label>
                            </div>
                        </div>
                        <div>
                            <label>Favorite Color</label>
                            <div>
                                <Field name="favoriteColor" component="select">
                                    <option/>
                                    <option value="ff0000">Red</option>
                                    <option value="00ff00">Green</option>
                                    <option value="0000ff">Blue</option>
                                </Field>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="employed">Employed</label>
                            <div>
                                <Field
                                    name="employed"
                                    id="employed"
                                    component="input"
                                    type="checkbox"
                                />
                            </div>
                        </div>
                        <div>
                            <label>Notes</label>
                            <div>
                                <Field name="notes" component="textarea"/>
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={pristine || submitting}>
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
// Start
//
const rootReducer = combineReducers({
    form: reduxFormReducer // mounted under "form"
});

const storeEnhancer = composeWithDevTools();

const store = createStore(rootReducer, storeEnhancer);

ReactDOM.render(
    <Provider store={store}>
        <SimpleForm/>
    </Provider>,
    document.getElementById('app')
);

