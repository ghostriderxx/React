import React from 'react';
import PropTypes from 'prop-types';

// antd
import { List } from 'antd';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        todos: PropTypes.string,
        onClick: PropTypes.func
    };

    handleClick(id) {
        const { onClick } = this.props;
        onClick(id);
    }

    render() {
        const { todos } = this.props;

        return (
            <div className={'todoapp-visibletodos'}>
                <List
                    itemLayout="horizontal"
                    dataSource={todos}
                    renderItem={({ id, text, complete, date }) => (
                        <List.Item
                            onClick={() => this.handleClick(id)}
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
        );
    }
}
