import {createStore, applyMiddleware} from "redux"
import promiseMiddleware from 'redux-promise-middleware'
import {delay} from "./utils"

///////////////////////////////////////////////////////////////////
// InitialState、Reducer
//
const initialState = {
    count: 0,
    loading: false,
    error: null,
};

function reducer(state = initialState, action){
    console.log("--");
    console.log(`prevState:`, state);
    console.log(`   action: ${action.type}`);

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
// ActionCreators
//
function asyncInc(){
    return {
        type: "INC",
        payload: delay(3000),
    }
}

///////////////////////////////////////////////////////////////////
// Init Redux
//
const store = createStore(reducer, applyMiddleware(promiseMiddleware()));
store.subscribe(()=>{
    console.log(` newState:`, store.getState());
});

///////////////////////////////////////////////////////////////////
// Dispatch Action
//
store.dispatch(asyncInc()).then(()=>{
    store.dispatch(asyncInc());
});