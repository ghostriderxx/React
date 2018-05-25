import React from "react"
import { connect } from 'react-redux'

@connect(({todoapp})=>({todoapp}), (dispatch)=>({dispatch}))
export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleTodo(id) {
        this.props.dispatch({
            type: "TOGGLE_TODO_COMPLETE_STATE",
            payload: id,
        });
    }

    render() {
        const todos = this.props.todoapp.todos;
        return (
            <ul>
                {
                    todos.map((todo) => {
                        <li key={todo.id} onClick={() => {
                            this.toggleTodo(todo.id)
                        }}>{todo.text}</li>
                    })
                }
            </ul>
        );
    }
}