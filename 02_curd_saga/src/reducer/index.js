import { combineReducers } from 'redux'
import { routerReducer} from 'react-router-redux'

import userMng from './userMngReducer'
import userEdit from "./userEditReducer"

const rootReducer = combineReducers({
    userMng,
    userEdit,
    router: routerReducer,
})

export default rootReducer