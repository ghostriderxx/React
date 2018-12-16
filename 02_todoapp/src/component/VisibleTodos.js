// React、Redux
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class VisibleTodos extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        toggleTodo: PropTypes.func,
        todos: PropTypes.array
    };

    render() {
        const { todos } = this.props;
        return (
            <ul>
                {todos.map(({ id, text, complete, date }) => {
                    const todoCls = classnames('todoapp-visibletodos-todo', {
                        complete: complete
                    });

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
        );
    }
}
