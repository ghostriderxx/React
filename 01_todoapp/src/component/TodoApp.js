// React、Redux
import React from "react"

// Component
import TodoFilter from "./TodoFilter";
import AddTodo from "./AddTodo";
import VisibleTodos from "./VisibleTodos";

// CSS
import "./TodoApp.css"

export default class TodoApp extends React.Component {
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