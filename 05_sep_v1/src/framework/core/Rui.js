import React from 'react'
import PropTypes from 'prop-types';

export default class Rui extends React.Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        store: PropTypes.object
    };
}
