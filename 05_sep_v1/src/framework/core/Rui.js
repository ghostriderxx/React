import React from 'react'
import PropTypes from 'prop-types';

export default class Rui extends React.Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        store: PropTypes.object
    };

    invoke(type, payload) {
        const dispatch = this.context && this.context.store && this.context.store.dispatch;
        dispatch({
            type: type,
            payload: payload,
        });
    }

    openRES(title, componentPath, width, height, params) {
        this.invoke("lane/openRes", {
            componentPath,
            width,
            title,
            params
        });
    }
}
