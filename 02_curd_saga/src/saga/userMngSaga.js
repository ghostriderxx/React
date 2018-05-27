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

/**
 * Watcher Saga
 */
function* fetchUserListWatcher() {
    yield takeLatest("FETCH_USERLIST_REQUESTED", fetchUserListWorker);
}

export default function* userMngSaga(){
    yield all([
        fetchUserListWatcher()
    ]);
};