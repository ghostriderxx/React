import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../util/request"

// Worker
function* fetchUserListWorker(action) {
    yield put({type: "FETCH_USERLIST_INPROGRESS"});
    const userQueryKey = action.payload;
    const userList = yield call(request, userQueryKey ? `/api/users?name_like=${userQueryKey}` : `/api/users`);
    yield put({type: "FETCH_USERLIST_SUCCESS", payload: userList});
}
function* deleteUserWorker(action) {
    // 完成删除
    const id = action.payload;
    yield put({type: "DELETE_USER_INPROGRESS"});
    yield call(request, `/api/users/${id}`, {method:"DELETE"});
    yield put({type: "DELETE_USER_SUCCESS"});

    // 重新查询
    yield put({type: "FETCH_USERLIST_REQUESTED"});
}

// Watcher
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