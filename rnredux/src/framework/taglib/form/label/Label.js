import PropTypes from 'prop-types';

//////////////////////////////////////////////////////////////////////////////
// React、ReactNative
//
import React from "react";
import {
   Text
} from 'react-native';

//////////////////////////////////////////////////////////////////////////////
// Panel
//
export default class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {fontSize, fontColor, ...rest} = this.props;

        return <Text {...rest} style={{
            color: fontColor,
            fontSize: fontSize
        }}/>
    }
}
Label.propTypes = {
    fontSize: PropTypes.number,
    fontColor: PropTypes.string,
};