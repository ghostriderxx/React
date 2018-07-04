///////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

// ## Redux
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';

// ## Redux-Form-Utils
import {createForm, bindRedux} from './lib/redux-form-utils';

// ## Devtools
import {composeWithDevTools} from 'redux-devtools-extension';

///////////////////////////////////////////////////////////////////////////////
// UserInfoForm
//
// ## formConfig
const userInfoForm = {
    form: 'userinfo',
    fields: ['name', 'age', 'gender'],
};

// ## reducer
const {state: userInfoFormState, reducer: userInfoFormReducer} = bindRedux(userInfoForm);

const userInfoInitialState = {
    ...userInfoFormState
};

function userInfoReducer(state = userInfoInitialState, action) {
    switch (action.type) {
        default:
            return userInfoFormReducer(state, action);
    }
}

// ## form container
@connect(({userInfo}) => ({form: userInfo.form}))
@createForm(userInfoForm)
class UserInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit(event) {
        event.preventDefault(); // 阻止默认事件

        console.log(this.props.form);
    }

    render() {
        const {clear, clearAll} = this.props;
        const {name, age, gender} = this.props.fields;

        return (
            <fieldset>
                <legend>个人信息</legend>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    姓名：<input type="text" {...name} placeholder="请输入姓名"/>
                    <br/><br/>

                    年龄：<input type="number" {...age} placeholder="请输入年龄"/>
                    <br/><br/>

                    性别：
                    <select {...gender}>
                        <option>请选择...</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </select>
                    <br/><br/>

                    <div>
                        <button type={"button"} onClick={() => clear("name")}>清空[姓名]</button>
                        <button type={"button"} onClick={() => clear("age")}>清空[年龄]</button>
                        <button type={"button"} onClick={() => clear("gender")}>清空[性别]</button>
                        <button type={"button"} onClick={() => clearAll()}>清空全部</button>
                        <button type={"submit"}>提交</button>
                    </div>
                </form>
            </fieldset>
        );
    }
}

///////////////////////////////////////////////////////////////////////////////
// BookInfoForm
//
// ## formConfig
const bookInfoForm = {
    form: 'bookinfo',
    fields: ['bookName', 'pageNums', 'isbn'],
};

// ## reducer
const {state: bookInfoFormState, reducer: bookInfoFormReducer} = bindRedux(bookInfoForm);

const bookInfoInitialState = {
    ...bookInfoFormState // form: { formField1: {value: ""}, formField2: {value: ""}, .... };
};

function bookInfoReducer(state = bookInfoInitialState, action) {
    switch (action.type) {
        default:
            return bookInfoFormReducer(state, action);
    }
}

// ## form container
@connect(({bookInfo}) => ({form: bookInfo.form}))
@createForm(bookInfoForm)
class BookInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit(event) {
        event.preventDefault(); // 阻止默认事件

        console.log(this.props.form);
    }

    render() {
        const {clear, clearAll} = this.props;
        const {bookName, pageNums, isbn} = this.props.fields;

        return (
            <fieldset>
                <legend>图书信息</legend>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    书名：<input type="text" {...bookName} placeholder="请输入书名"/>
                    <br/><br/>

                    页数：<input type="number" {...pageNums} placeholder="请输入页数"/>
                    <br/><br/>

                    书号：<input type="text" {...isbn} placeholder="请输入书号"/>
                    <br/><br/>

                    <div>
                        <button type={"button"} onClick={() => clear("bookName")}>清空[书名]</button>
                        <button type={"button"} onClick={() => clear("pageNums")}>清空[页数]</button>
                        <button type={"button"} onClick={() => clear("isbn")}>清空[书号]</button>
                        <button type={"button"} onClick={() => clearAll()}>清空全部</button>
                        <button type={"submit"} >提交</button>
                    </div>
                </form>
            </fieldset>
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
const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    bookInfo: bookInfoReducer,
});

const storeEnhancer = composeWithDevTools();

const store = createStore(rootReducer, storeEnhancer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);