///////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

// ## Redux
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

// ## Redux-Form
import {reducer as formReducer, Field, reduxForm} from 'redux-form'

// ## Devtools
import {composeWithDevTools} from "redux-devtools-extension";

///////////////////////////////////////////////////////////////////////////////
// UserInfoForm
//
@reduxForm({
    form: 'userInfo',
    onSubmit: (values) => {
        console.log("userInfo", values);
    }
})
class UserInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit, reset, resetSection} = this.props;

        return (
            <fieldset>
                <legend>个人信息</legend>
                <form onSubmit={handleSubmit}>
                    姓名：
                    <Field name="name" component="input" type="text"/>
                    <br/><br/>

                    年龄：
                    <Field name="age" component="input" type="number"/>
                    <br/><br/>

                    性别：
                    <Field name="gender" component="select">
                        <option>请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </Field>
                    <br/><br/>

                    <div>
                        <button type={"button"} onClick={() => resetSection("name")}>清空[姓名]</button>
                        <button type={"button"} onClick={() => resetSection("age")}>清空[年龄]</button>
                        <button type={"button"} onClick={() => resetSection("gender")}>清空[性别]</button>
                        <button type={"button"} onClick={() => reset()}>清空全部</button>
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
@reduxForm({
    form: 'bookInfo',
    onSubmit: (values) => {
        console.log("bookInfo", values);
    }
})
class BookInfoForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit, reset, resetSection} = this.props;

        return (
            <fieldset>
                <legend>图书信息</legend>
                <form onSubmit={handleSubmit}>
                    书名：
                    <Field name="bookName" component="input" type="text"/>
                    <br/><br/>

                    页号：
                    <Field name="pageNums" component="input" type="number"/>
                    <br/><br/>

                    书号：
                    <Field name="isbn" component="input" type="text"/>
                    <br/><br/>


                    <div>
                        <button type={"button"} onClick={() => resetSection("bookName")}>清空[书名]</button>
                        <button type={"button"} onClick={() => resetSection("pageNums")}>清空[页数]</button>
                        <button type={"button"} onClick={() => resetSection("isbn")}>清空[书号]</button>
                        <button type={"button"} onClick={() => reset()}>清空全部</button>
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
    form: formReducer, // 挂载redux-form的reducer;
});

const storeEnhancer = composeWithDevTools(
    applyMiddleware()
);

const store = createStore(rootReducer, storeEnhancer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);