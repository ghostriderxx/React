// React、Redux
import React from 'react';
import { connect } from 'react-redux';

// Component
import TodoFilter from './TodoFilter';
import AddTodo from './AddTodo';
import VisibleTodos from './VisibleTodos';

// CSS
import './TodoApp.css';

// // reselect
// const getTodos = (todoapp) => todoapp.todos;
// const getVisibilityFilter = (todoapp) => todoapp.visibilityFilter;
// const getVisibilityTodos = createSelector(
//     [getTodos, getVisibilityFilter],
//     (todos, visibilityFilter) => {
//         switch (visibilityFilter) {
//             case 'SHOW_ALL':
//                 return {
//                     visibilityTodos: todos
//                 };
//             case 'SHOW_ACTIVE':
//                 return {
//                     visibilityTodos: todos.filter((todo) => !todo.complete)
//                 };
//             case 'SHOW_COMPLETED':
//                 return {
//                     visibilityTodos: todos.filter((todo) => todo.complete)
//                 };
//         }
//     }
// );

function filterTodos(todos, visibilityFilter) {
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

@connect(({ todoapp }) => ({ todoapp }))
export default class TodoApp extends React.Component {
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
        const { todos, visibilityFilter } = this.props.todoapp;

        const visibleTodos = filterTodos(todos, visibilityFilter);

        return (
            <div className={'todoapp'}>
                <AddTodo />
                <VisibleTodos
                    todos={visibleTodos}
                    toggleTodo={(id) => this.toggleTodo(id)}
                />
                <TodoFilter />
            </div>
        );
    }
}
