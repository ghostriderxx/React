import {createStore, applyMiddleware} from "redux"
import promise from 'redux-promise';
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
// ActionCreator
//
function inc(){
    return {
        type: "INC",
        payload: delay(2000),
    }
}

///////////////////////////////////////////////////////////////////
// Init Redux
//
const store = createStore(reducer, applyMiddleware(promise));
store.subscribe(()=>{
    console.log(store.getState());
});

///////////////////////////////////////////////////////////////////
// Dispatch Action
//
store.dispatch(inc()).then(()=>{
    store.dispatch(inc());
});