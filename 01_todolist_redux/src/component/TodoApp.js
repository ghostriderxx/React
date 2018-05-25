import React from "react"
import TodoFilter from "./TodoFilter";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TodoList/>
                <AddTodo/>
                <TodoFilter/>
            </div>
        );
    }
}
export default TodoApp;