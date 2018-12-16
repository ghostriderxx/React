// React、Redux
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

// components
import AddTodo from './AddTodo';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

// selector
const getTodos = (todoapp) => todoapp.todos;
const getVisibilityFilter = (todoapp) => todoapp.visibilityFilter;
const getVisibilityTodos = createSelector(
    [getTodos, getVisibilityFilter],
    (todos, visibilityFilter) => {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_ACTIVE':
                return todos.filter((todo) => !todo.complete);
            case 'SHOW_COMPLETED':
                return todos.filter((todo) => todo.complete);
        }
    }
);

import '../style.css';

@connect(({ todoapp }) => ({ todoapp }))
export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    addTodo = (todo) => {
        this.props.dispatch({
            type: 'ADD_TODO',
            payload: todo
        });
    };

    setVisibilityFilter = (filterType) => {
        this.props.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: filterType
        });
    };

    toggleTodoCompleteState = (id) => {
        this.props.dispatch({
            type: 'TOGGLE_TODO_COMPLETE_STATE',
            payload: id
        });
    };

    render() {
        const { visibilityFilter } = this.props.todoapp;

        const t = Date.now();
        const visibleTodos = getVisibilityTodos(this.props.todoapp);
        const t1 = Date.now();
        console.log(t1 - t);

        return (
            <div className={'todoapp'}>
                <AddTodo addTodo={this.addTodo} />
                <TodoFilter
                    value={visibilityFilter}
                    onChange={this.setVisibilityFilter}
                />
                <TodoList
                    todos={visibleTodos}
                    onClick={this.toggleTodoCompleteState}
                />
            </div>
        );
    }
}
