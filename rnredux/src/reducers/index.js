import { combineReducers } from 'redux';

import counter from './counterReducer';
import contactList from './contactListReducer';

const rootReducer = combineReducers({
    counter:counter,
    contactList:contactList
});

export default rootReducer;
