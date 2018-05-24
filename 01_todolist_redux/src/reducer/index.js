import { combineReducers } from 'redux'
import todoapp from './TodoReducer'

const rootReducer = combineReducers({
    todoapp,
})

export default rootReducer