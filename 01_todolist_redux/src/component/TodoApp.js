import React from "react"
import TodoFilter from "./TodoFilter";
import AddTodo from "./AddTodo";
import VisibleTodos from "./VisibleTodos";

import "./TodoApp.css"

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"todoapp"}>
                <AddTodo/>
                <VisibleTodos/>
                <TodoFilter/>
            </div>
        );
    }
}
export default TodoApp;