// React、Redux
import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { genTodoId, VISIBILITY_FILETER_TYPES } from '../util';

// antd
import 'antd/dist/antd.css';
import { Button, Input, Radio, List } from 'antd';
const RadioGroup = Radio.Group;

import '../style.css';

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

    onVisibilityFilterChange(e) {
        const filter = e.target.value;
        this.props.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: filter
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
                {/* addTodo */}
                <div className={'todoapp-addtodo'}>
                    <div className={'todoapp-addtodo-btnWrapper'}>
                        <Button block={true} onClick={() => this.addTodo()}>
                            AddTodo
                        </Button>
                    </div>
                    <div className={'todoapp-addtodo-inputWrapper'}>
                        <Input
                            value={this.state.text}
                            onChange={(e) => this.textOnChange(e)}
                        />
                    </div>
                </div>

                {/* todoFilter */}
                <div className={'todoapp-todofilter'}>
                    <RadioGroup
                        onChange={this.onVisibilityFilterChange}
                        value={this.state.value}
                    >
                        {VISIBILITY_FILETER_TYPES.map((filterType) => (
                            <Radio value={filterType}>{filterType}</Radio>
                        ))}
                    </RadioGroup>
                </div>

                {/* visibleTodos */}
                <div className={'todoapp-visibletodos'}>
                    <List
                        itemLayout="horizontal"
                        dataSource={visibleTodos}
                        renderItem={({ id, text, complete, date }) => (
                            <List.Item
                                onClick={() => this.toggleTodoCompleteState(id)}
                                key={id}
                                style={
                                    complete
                                        ? { textDecoration: 'line-through' }
                                        : null
                                }
                            >
                                {text}
                                >>>>
                                {date.toLocaleTimeString()}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }
}
