import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../util/request"

/**
 * Worker Saga
 */
function* fetchUserListWorker(action) {
    try {
        yield put({type: "FETCH_USERLIST_INPROGRESS"});
        const userList = yield call(request, "/api/users");
        yield put({type: "FETCH_USERLIST_SUCCESS", payload: userList});
    } catch (e) {
        yield put({type: "FETCH_USERLIST_FAILED", payload: e.message});
    }
}

function* deleteUserWorker(action) {
    try {
        // 完成删除
        const id = action.payload;
        yield put({type: "DELETE_USER_INPROGRESS"});
        yield call(request, `/api/users/${id}`, {method:"DELETE"});
        yield put({type: "DELETE_USER_SUCCESS"});

        // 重新查询
        yield put({type: "FETCH_USERLIST_REQUESTED"});
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