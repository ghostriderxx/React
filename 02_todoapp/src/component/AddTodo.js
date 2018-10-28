// React、Redux
import React from "react"
import {connect} from "react-redux";

// todoId 生成器
let todoId = 0;
const genTodoId = () => todoId++

@connect()
export default class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };

        // 避免 button 组件额外的渲染工作
        this.addTodo = this.addTodo.bind(this);
        this.textOnChange = this.textOnChange.bind(this);
    }
    textOnChange(e) {
        this.setState({
            text: e.target.value
        })
    }
    addTodo() {
        if (!this.state.text.trim()) {
            return;
        }
        this.props.dispatch({
            type: "ADD_TODO",
            payload: {
                text: this.state.text,
                complete: false,
                id: genTodoId(),
                date: new Date(),
            },
        });
    }
    render() {
        return (
            <div className={"todoapp-addtodo"}>
                <input className={"todoapp-addtodo-text"}
                       value={this.state.text}
                       onChange={this.textOnChange}/>
                <button className={"todoapp-addtodo-btnadd"} onClick={this.addTodo}>
                    AddTodo
                </button>
            </div>
        );
    }
}