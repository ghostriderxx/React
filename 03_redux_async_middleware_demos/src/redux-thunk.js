import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {delay} from "./utils"

///////////////////////////////////////////////////////////////////
// Redux init
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

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(()=>{
    console.log(store.getState());
});

///////////////////////////////////////////////////////////////////
// ActionCreators
//
function incSuccess(){
    return {type: "INC_SUCCESS"};
}

function incInProgress(){
    return {type: "INC_INPROGRESS"};
}

function incError(error){
    return {type: "INC_ERROR", payload:error};
}

function inc(){
    return (dispatch, getState) => {

        dispatch(incInProgress());

        delay(2000).then(()=>{

            dispatch(incSuccess());

        }).catch((error)=>{

            dispatch(incError(error.message));

        });
    };
}

///////////////////////////////////////////////////////////////////

store.dispatch(inc());