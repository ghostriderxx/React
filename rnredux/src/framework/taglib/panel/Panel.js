import PropTypes from 'prop-types';

//////////////////////////////////////////////////////////////////////////////
// React、ReactNative
//
import React from "react";
import {
   View
} from 'react-native';

//////////////////////////////////////////////////////////////////////////////
// Panel
//
export default class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View {...this.props}/>
    }
}
Panel.propTypes = {
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
};