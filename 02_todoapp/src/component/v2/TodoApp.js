// React、Redux
import React from 'react';
import { connect } from 'react-redux';

// components
import AddTodo from './AddTodo';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

import '../style.css';

@connect(({ todoapp }) => ({ todoapp }))
export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
    }

    addTodo(todo) {
        this.props.dispatch({
            type: 'ADD_TODO',
            payload: todo
        });
    }

    setVisibilityFilter(filterType) {
        this.props.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: filterType
        });
    }

    toggleTodoCompleteState(id) {
        this.props.dispatch({
            type: 'TOGGLE_TODO_COMPLETE_STATE',
            payload: id
        });
    }

    filterTodos(todos, visibilityFilter) {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_ACTIVE':
                return todos.filter((todo) => !todo.complete);
            case 'SHOW_COMPLETED':
                return todos.filter((todo) => todo.complete);
        }
    }

    render() {
        const { todos, visibilityFilter } = this.props.todoapp;

        const visibleTodos = this.filterTodos(todos, visibilityFilter);

        return (
            <div className={'todoapp'}>
                <AddTodo addTodo={(payload) => this.addTodo(payload)} />
                <TodoFilter
                    value={visibilityFilter}
                    onChange={(filterType) =>
                        this.setVisibilityFilter(filterType)
                    }
                />
                <TodoList
                    todos={visibleTodos}
                    onClick={(id) => this.toggleTodoCompleteState(id)}
                />
            </div>
        );
    }
}
