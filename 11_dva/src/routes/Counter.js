import React from 'react';
import {connect} from 'dva';
import Counter from "../components/Counter"

export default connect(({counter}) => ({
    counter,
}))(Counter);