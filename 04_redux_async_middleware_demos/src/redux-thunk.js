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

function reducer(state = initialState, action) {

    console.log("--");
    console.log(`prevState:`, state);
    console.log(`   action: ${action.type}`);

    switch (action.type) {
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
function asyncInc() {
    return (dispatch, getState) => {

        dispatch({type: "INC_INPROGRESS"}); // 常用于让UI显示一个loading动画...

        return delay(3000).then(() => {

            dispatch({type: "INC_SUCCESS"}); // 异步成功

        }).catch((error) => {

            dispatch({type: "INC_ERROR", payload: error.message}); // 异步失败

        });
    };
}

///////////////////////////////////////////////////////////////////
// Init Redux
//
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
    console.log(` newState:`, store.getState());
});

///////////////////////////////////////////////////////////////////
// Dispatch Action
//
store.dispatch(asyncInc()).then(() => {
    return store.dispatch(asyncInc())
});