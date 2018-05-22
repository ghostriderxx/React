import { combineReducers } from 'redux';

import contactList from './contactListReducer';
import zizhi from "./zizhiReducer";

const rootReducer = combineReducers({
    contactList,
    zizhi,
});

export default rootReducer;
