import {createStore, applyMiddleware} from "redux"
import promiseMiddleware from 'redux-promise-middleware'
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
        case "INC_PENDING":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "INC_FULFILLED":
            return {
                ...state,
                count: state.count + 1,
                loading: false,
                error: null,
            };
        case "INC_REJECTED":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

///////////////////////////////////////////////////////////////////
// Redux init
//
const store = createStore(reducer, applyMiddleware(promiseMiddleware()));

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