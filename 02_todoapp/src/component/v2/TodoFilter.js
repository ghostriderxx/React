import React from 'react';
import PropTypes from 'prop-types';

import { VISIBILITY_FILETER_TYPES } from '../util';

// antd
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

export default class TodoFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    handleChange(e) {
        const value = e.target.value;

        const { onChange } = this.props;
        onChange(value);
    }

    render() {
        const { value } = this.props;

        return (
            <div className={'todoapp-todofilter'}>
                <RadioGroup
                    onChange={(e) => this.handleChange(e)}
                    value={value}
                >
                    {VISIBILITY_FILETER_TYPES.map((filterType) => (
                        <Radio value={filterType}>{filterType}</Radio>
                    ))}
                </RadioGroup>
            </div>
        );
    }
}
