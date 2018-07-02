///////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

// ## Redux
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

// ## Devtools
import {composeWithDevTools} from "redux-devtools-extension";

// ## rc-form
import {createForm} from 'rc-form';

///////////////////////////////////////////////////////////////////////////////
// UserInfoForm
//
@createForm()
class UserInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            "UserInfoForm"
        );
    }
}

///////////////////////////////////////////////////////////////////////////////
// BookInfoForm
//
@createForm()
class BookInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }

    render() {

        const {getFieldDecorator, getFieldError, resetFields} = this.props.form;

        return (
            <div>
                <fieldset>
                    <legend>个人信息</legend>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        姓名：
                        {
                            getFieldDecorator('name', {
                                rules: [{ required: true, message: '请填写姓名!' }],
                                initialValue: '',
                            })(<input type={"text"}/>)
                        }
                        <div style={{ color: 'red' }}>
                            {(getFieldError('name') || []).join(', ')}
                        </div>

                        年龄：
                        {
                            getFieldDecorator('age', {
                                rules: [{ required: true, message: '请填写年龄!' }],
                                initialValue: '',
                            })(<input type={"number"}/>)
                        }
                        <div style={{ color: 'red' }}>
                            {(getFieldError('age') || []).join(', ')}
                        </div>

                        性别：
                        {
                            getFieldDecorator('gender', {
                                rules: [{ required: true, message: '请选择性别!' }],
                                initialValue: '',
                            })(
                                <select>
                                    <option>请选择</option>
                                    <option value="male">男</option>
                                    <option value="female">女</option>
                                </select>
                            )
                        }
                        <div style={{ color: 'red' }}>
                            {(getFieldError('gender') || []).join(', ')}
                        </div>

                        <br/>
                        <div>
                            <button type={"button"} onClick={() => resetFields(["name"])}>清空[姓名]</button>
                            <button type={"button"} onClick={() => resetFields(["age"])}>清空[年龄]</button>
                            <button type={"button"} onClick={() => resetFields(["gender"])}>清空[性别]</button>
                            <button type={"button"} onClick={() => resetFields()}>清空全部</button>
                            <button type={"submit"} >提交</button>
                        </div>
                    </form>
                </fieldset>
            </div>
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

    render() {
        return (
            <div>
                <UserInfoForm/>
                <BookInfoForm/>
            </div>
        );
    }
}

///////////////////////////////////////////////////////////////////////////////
// Start
//
const rootReducer = (state) => (state);

const storeEnhancer = composeWithDevTools();

const store = createStore(rootReducer, storeEnhancer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);