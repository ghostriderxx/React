import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../framework/util/request"

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


function* deleteUserWorker(action) {
    try {
        yield put({type: "DELETE_USER_INPROGRESS"});

        yield call(request, "/userMng/deleteUser", {
            empno: action.payload
        });

        yield put({type: "DELETE_USER_SUCCESS"});
    } catch (e) {
        yield put({type: "DELETE_USER_FAILED", payload: e.message});
    }
}

/**
 * Watcher Saga
 */
function* fetchUserListWatcher() {
    yield takeLatest("FETCH_USERLIST_REQUESTED", fetchUserListWorker);
}

function* deleteUserWatcher() {
    yield takeLatest("DELETE_USER_REQUESTED", deleteUserWorker);
}

export default function* userMngSaga(){
    yield all([
        fetchUserListWatcher(),
        deleteUserWatcher(),
    ]);
};