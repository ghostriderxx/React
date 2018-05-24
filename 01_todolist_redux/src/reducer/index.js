import { combineReducers } from 'redux'
import todolist from './TodoReducer'

const rootReducer = combineReducers({
    todolist,
})

export default rootReducer