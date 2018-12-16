// React、Redux
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { genTodoId, VISIBILITY_FILETER_TYPES } from '../util';

import '../style.css';

function filterTodos(todos, visibilityFilter) {
    switch (visibilityFilter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter((todo) => !todo.complete);
        case 'SHOW_COMPLETED':
            return todos.filter((todo) => todo.complete);
    }
}

@connect(({ todoapp }) => ({ todoapp }))
export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    textOnChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    addTodo() {
        if (!this.state.text.trim()) {
            return;
        }
        this.props.dispatch({
            type: 'ADD_TODO',
            payload: {
                text: this.state.text,
                complete: false,
                id: genTodoId(),
                date: new Date()
            }
        });
    }

    toggleTodo(id) {
        this.props.dispatch({
            type: 'TOGGLE_TODO_COMPLETE_STATE',
            payload: id
        });
    }

    setVisibilityFilter(filter) {
        this.props.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: filter
        });
    }

    getBtnClassName(p) {
        const visibilityFilter = this.props.visibilityFilter;
        const activeClassName = p == visibilityFilter ? 'active' : '';
        return `todoapp-todofilter-btn ${activeClassName}`;
    }

    render() {
        const { todos, visibilityFilter } = this.props.todoapp;

        const visibleTodos = filterTodos(todos, visibilityFilter);

        return (
            <div className={'todoapp'}>
                <div className={'todoapp-addtodo'}>
                    <input
                        className={'todoapp-addtodo-text'}
                        value={this.state.text}
                        onChange={(e) => this.textOnChange(e)}
                    />
                    <button
                        className={'todoapp-addtodo-btnadd'}
                        onClick={() => this.addTodo()}
                    >
                        AddTodo
                    </button>
                </div>
                {/* TodoFilter */}
                <div className={'todoapp-todofilter'}>
                    <span className={'todoapp-todofilter-label'}>Filter:</span>

                    {VISIBILITY_FILETER_TYPES.map((filterType) => (
                        <button
                            className={classnames('todoapp-todofilter-btn', {
                                active: visibilityFilter === filterType
                            })}
                            onClick={() => this.setVisibilityFilter(filterType)}
                        >
                            {filterType}
                        </button>
                    ))}
                </div>
                <div className={'todoapp-visibletodos'}>
                    <ul>
                        {visibleTodos.map(({ id, text, complete, date }) => {
                            const todoCls = classnames(
                                'todoapp-visibletodos-todo',
                                {
                                    complete: complete
                                }
                            );

                            return (
                                <li key={id}>
                                    <span
                                        className={todoCls}
                                        onClick={() => this.toggleTodo(id)}
                                    >
                                        {text}
                                        >>>>
                                        {date.toLocaleTimeString()}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
