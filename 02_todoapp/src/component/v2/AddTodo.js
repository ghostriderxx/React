import React from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from 'antd';

import { genTodoId } from '../util';

export default class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    static propTypes = {
        onAddTodo: PropTypes.func
    };

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleAddTodo() {
        const { addTodo } = this.props;
        addTodo({
            text: this.state.text,
            complete: false,
            id: genTodoId(),
            date: new Date()
        });
    }

    render() {
        return (
            <div className={'todoapp-addtodo'}>
                <div className={'todoapp-addtodo-btnWrapper'}>
                    <Button block={true} onClick={() => this.handleAddTodo()}>
                        AddTodo
                    </Button>
                </div>
                <div className={'todoapp-addtodo-inputWrapper'}>
                    <Input
                        value={this.state.text}
                        onChange={(e) => this.handleTextChange(e)}
                    />
                </div>
            </div>
        );
    }
}
