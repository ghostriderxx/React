// React、Redux
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// reselect
const getTodos = (todoapp) => todoapp.todos;
const getVisibilityFilter = (todoapp) => todoapp.visibilityFilter;
const getVisibilityTodos = createSelector(
    [getTodos, getVisibilityFilter],
    (todos, visibilityFilter) => {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return {
                    visibilityTodos: todos
                };
            case 'SHOW_ACTIVE':
                return {
                    visibilityTodos: todos.filter((todo) => !todo.complete)
                };
            case 'SHOW_COMPLETED':
                return {
                    visibilityTodos: todos.filter((todo) => todo.complete)
                };
        }
    }
);

@connect(({ todoapp }) => {
    return getVisibilityTodos(todoapp);
})
export default class VisibleTodos extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleTodo(id) {
        this.props.dispatch({
            type: 'TOGGLE_TODO_COMPLETE_STATE',
            payload: id
        });
    }

    render() {
        // todos + visibilityFilter ==> visibilityTodos
        const visibilityTodos = this.props.visibilityTodos;
        return (
            <ul>
                {visibilityTodos.map(({ id, text, complete, date }) => (
                    <li key={id}>
                        <span
                            className={
                                complete
                                    ? 'todoapp-visibletodos-todo complete'
                                    : 'todoapp-visibletodos-todo'
                            }
                            onClick={() => this.toggleTodo(id)}
                        >
                            {text}
                            >>>>
                            {date.toLocaleTimeString()}
                        </span>
                    </li>
                ))}
            </ul>
        );
    }
}
