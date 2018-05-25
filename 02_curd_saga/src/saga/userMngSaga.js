import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {all} from "redux-saga/es/effects";

// api
function fetch(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve([]);
        }, 3000);
    });
}

/**
 * Worker Saga
 */
function* fetchUserList(action) {
    try {
        yield put({type: "FETCH_ZIZHILIST_INPROGRESS"});

        const zizhiList = yield call(fetch);

        yield put({type: "FETCH_ZIZHILIST_SUCCESS", payload: zizhiList});
    } catch (e) {
        yield put({type: "FETCH_ZIZHILIST_FAILED", payload: e.message});
    }
}

/**
 * Watcher Saga
 */
function* fetchUserList() {
    yield takeLatest("FETCH_USERLIST_REQUESTED", fetchUserList);
}

function* modifyUser() {
    yield takeLatest("MODIFY_USER_REQUESTED", fetchUserList);
}


export default function* userMngSaga(){
    yield all([
        fetchUserList(),
        modifyUser(),
    ]);
};