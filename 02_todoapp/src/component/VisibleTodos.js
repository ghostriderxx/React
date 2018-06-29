// React、Redux
import React from "react"
import {connect} from 'react-redux'

@connect(
    ({todoapp}) => ({todoapp}),
    (dispatch) => ({dispatch})
)
export default class VisibleTodos extends React.Component {
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
        // todos + visibilityFilter ==> visibilityTodos
        const todos = this.props.todoapp.todos;
        const visibilityFilter = this.props.todoapp.visibilityFilter;
        const visibilityTodos = todos.filter((todo)=>{
            if(visibilityFilter == "SHOW_ALL"){
                return true;
            }else if(visibilityFilter == "SHOW_ACTIVE"){
                return !todo.complete;
            }else if(visibilityFilter == "SHOW_COMPLETED"){
                return todo.complete;
            }else{
                throw new Error(`Wrong visiblilityFilter: ${visibilityFilter}`);
            }
        })

        return (
            <ul>
                {
                    visibilityTodos.map(todo => <li key={todo.id}>
                            <span className={todo.complete ? "todoapp-visibletodos-todo complete" : "todoapp-visibletodos-todo"}
                                  onClick={() => this.toggleTodo(todo.id)}>
                                {todo.text}>>>>{todo.date.toLocaleTimeString()}
                            </span>
                        </li>
                    )
                }
            </ul>
        );
    }
}