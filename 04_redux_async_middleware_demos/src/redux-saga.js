import {createStore, applyMiddleware} from "redux"

import createSagaMiddleware from 'redux-saga'
import { put, takeEvery, takeLatest } from 'redux-saga/effects'

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
// Saga
//
function* incWorker(action) {
    try{
        yield put({type: "INC_INPROGRESS"});
        yield delay(3000);
        yield put({type: "INC_SUCCESS"});
    } catch (e) {
        yield put({type: "INC_ERROR", payload: e.message});
    }
}

function* incWatcher() {
    yield takeEvery("INC_REQUESTED", incWorker);
}

///////////////////////////////////////////////////////////////////
// Init Redux
//
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(incWatcher);

store.subscribe(()=>{
    console.log(` newState:`, store.getState());
});

///////////////////////////////////////////////////////////////////
// Dispatch Action
//
store.dispatch({type: "INC_REQUESTED"});