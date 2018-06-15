import { combineReducers } from 'redux'

import userMng from './userMng'
import userEdit from "./userEdit"

const rootReducer = combineReducers({
    userMng,
    userEdit,
})

export default rootReducer