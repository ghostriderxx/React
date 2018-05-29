import { combineReducers } from 'redux'
import yzMng from './YzReducer'
import sub2 from "./Sub2Reducer"
import sub3 from "./Sub3Reducer"

const rootReducer = combineReducers({
    yzMng,
    sub2,
    sub3,
})

export default rootReducer