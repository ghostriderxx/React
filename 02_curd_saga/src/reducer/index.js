import { combineReducers } from 'redux'
import userMng from './userMngReducer'

const rootReducer = combineReducers({
    userMng,
})

export default rootReducer