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
    console.log("--");
    console.log(`prevState:`, state);
    console.log(`   action: ${action.type}`);

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
function asyncInc(){
    return {
        type: "INC",
        payload: delay(3000),
    }
}

///////////////////////////////////////////////////////////////////
// Init Redux
//
const store = createStore(reducer, applyMiddleware(promise));
store.subscribe(()=>{
    console.log(` newState:`, store.getState());
});

///////////////////////////////////////////////////////////////////
// Dispatch Action
//
store.dispatch(asyncInc()).then(()=>{
    store.dispatch(asyncInc());
});