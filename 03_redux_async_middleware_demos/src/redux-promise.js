import {createStore, applyMiddleware} from "redux"
import promiseMiddleware from 'redux-promise';
import {delay} from "./utils"

///////////////////////////////////////////////////////////////////
// InitialState、Reducer
//
const initialState = {
    count: 0,
    error: null,
};

function reducer(state = initialState, action){
    switch(action.type){
        case "INC":
            if(action.error){
                return {
                    ...state,
                    error: action.payload,
                }
            }else{
                return {
                    count: state.count + 1,
                    error: null,
                }
            }
        default:
            return state;
    }
}

///////////////////////////////////////////////////////////////////
// Redux init
//
const store = createStore(reducer, applyMiddleware(promiseMiddleware));

store.subscribe(()=>{
    console.log(store.getState());
});

///////////////////////////////////////////////////////////////////
// ActionCreators
//
function inc(){
    return {
        type: "INC",
        payload: delay(2000),
    }
}

///////////////////////////////////////////////////////////////////
// dispatch action
//
store.dispatch(inc()).then(()=>{
    store.dispatch(inc());
});