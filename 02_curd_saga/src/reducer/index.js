import { combineReducers } from 'redux'
import userMng from './userMngReducer'
import userEdit from "./userEditReducer"

const rootReducer = combineReducers({
    userMng,
    userEdit,
})

export default rootReducer