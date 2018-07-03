///////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

///////////////////////////////////////////////////////////////////////////////
// UserInfoForm
//
class UserInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age: 0,
            gender: "",
        }
    }

    // 人员信息
    handleNameChange(name){
        this.setState({
            name
        });
    }

    handleAgeChange(age){
        this.setState({
            age
        });
    }

    handleGenderChange(gender){
        this.setState({
            gender
        });
    }

    resetSection(field){
        this.setState({
            [field]: ""
        });
    }

    reset(){
        this.setState({
            name: "",
            age: 0,
            gender: "",
        });
    }

    handleSubmit(e){
        e.preventDefault();

        console.log(this.state);
    }

    render() {
        return (
            <fieldset>
                <legend>个人信息</legend>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    姓名：
                    <input type={"text"} value={this.state.name} onChange={(e)=>this.handleNameChange(e.target.value)}/>
                    <br/><br/>

                    年龄：
                    <input type={"text"} value={this.state.age} onChange={(e)=>this.handleAgeChange(e.target.value)}/>
                    <br/><br/>

                    性别：
                    <select value={this.state.gender} onChange={(e)=>this.handleGenderChange(e.target.value)}>
                        <option>请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                    </select>
                    <br/><br/>

                    <div>
                        <button type={"button"} onClick={() => this.resetSection("name")}>清空[姓名]</button>
                        <button type={"button"} onClick={() => this.resetSection("age")}>清空[年龄]</button>
                        <button type={"button"} onClick={() => this.resetSection("gender")}>清空[性别]</button>
                        <button type={"button"} onClick={() => this.reset()}>清空全部</button>
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
class BookInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookName: "",
            pageNums: 0,
            isbn: 0,
        }
    }

    // 图书信息
    handleBookNameChange(bookName){
        this.setState({
            bookName
        });
    }

    handlePageNumsChange(pageNums){
        this.setState({
            pageNums
        });
    }

    handleIsbnChange(isbn){
        this.setState({
            isbn
        });
    }

    resetSection(field){
        this.setState({
            [field]: ""
        });
    }

    reset(){
        this.setState({
            bookName: "",
            pageNums: 0,
            isbn: 0,
        });
    }

    handleSubmit(e){
        e.preventDefault();

        console.log(this.state);
    }

    render() {
        return (
            <fieldset>
                <legend>图书信息</legend>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    书名：
                    <input type={"text"} value={this.state.bookName} onChange={(e)=>this.handleBookNameChange(e.target.value)}/>
                    <br/><br/>

                    页号：
                    <input type={"number"} value={this.state.pageNums} onChange={(e)=>this.handlePageNumsChange(e.target.value)}/>
                    <br/><br/>

                    书号：
                    <input type={"text"} value={this.state.isbn} onChange={(e)=>this.handleIsbnChange(e.target.value)}/>
                    <br/><br/>

                    <div>
                        <button type={"button"} onClick={() => this.resetSection("bookName")}>清空[书名]</button>
                        <button type={"button"} onClick={() => this.resetSection("pageNums")}>清空[页数]</button>
                        <button type={"button"} onClick={() => this.resetSection("isbn")}>清空[书号]</button>
                        <button type={"button"} onClick={() => this.reset()}>清空全部</button>
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
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);