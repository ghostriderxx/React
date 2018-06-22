import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
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
    switch(action.type){
        case "INC_INPROGRESS":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "INC_SUCCESS":
            return {
                ...state,
                count: state.count + 1,
                loading: false,
                error: null,
            };
        case "INC_ERROR":
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
// ActionCreator
//
function inc(){
    return (dispatch, getState) => {

        dispatch({type: "INC_INPROGRESS"});

        delay(2000).then(()=>{

            dispatch({type: "INC_SUCCESS"});

        }).catch((error)=>{

            dispatch({type: "INC_ERROR", payload:error.message});

        });
    };
}

///////////////////////////////////////////////////////////////////
// Init Redux
//
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(()=>{
    console.log(store.getState());
});

///////////////////////////////////////////////////////////////////
// Dispatch Action
//
store.dispatch(inc());