import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../util/request"

/**
 * Worker Saga
 */
function* fetchUserListWorker(action) {
    try {
        yield put({type: "FETCH_USERLIST_INPROGRESS"});

        const userList = yield call(request, "/userMng/fetchUserList");

        yield put({type: "FETCH_USERLIST_SUCCESS", payload: userList});
    } catch (e) {
        yield put({type: "FETCH_USERLIST_FAILED", payload: e.message});
    }
}

function* addUserWorker(action) {
    try {
        yield put({type: "ADD_USER_INPROGRESS"});

        yield call(request, "/userMng/addUser", {
            ...action.payload
        });

        yield put({type: "ADD_USER_SUCCESS"});
    } catch (e) {
        yield put({type: "ADD_USER_FAILED", payload: e.message});
    }
}



/**
 * Watcher Saga
 */
function* fetchUserListWatcher() {
    yield takeLatest("FETCH_USERLIST_REQUESTED", fetchUserListWorker);
}

function* addUserWatcher() {
    yield takeLatest("ADD_USER_REQUESTED", addUserWorker);
}

export default function* userMngSaga(){
    yield all([
        fetchUserListWatcher(),
        addUserWatcher(),
    ]);
};