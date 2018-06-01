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
function* fetchUserWorker(action) {
    try {
        yield put({type: "FETCH_USER_INPROGRESS"});

        const user = yield call(request, "/userMng/fetchUser", action.payload);

        yield put({type: "FETCH_USER_SUCCESS", payload: user});
    } catch (e) {
        yield put({type: "FETCH_USER_FAILED", payload: e.message});
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

function* saveUserWorker(action) {
    try {
        yield put({type: "SAVE_USER_INPROGRESS"});

        yield call(request, "/userMng/saveUser", {
            ...action.payload
        });

        yield put({type: "SAVE_USER_SUCCESS"});
    } catch (e) {
        yield put({type: "SAVE_USER_FAILED", payload: e.message});
    }
}

/**
 * Watcher Saga
 */
function* fetchUserListWatcher() {
    yield takeLatest("FETCH_USERLIST_REQUESTED", fetchUserListWorker);
}

function* fetchUserWatcher() {
    yield takeLatest("FETCH_USER_REQUESTED", fetchUserWorker);
}

function* addUserWatcher() {
    yield takeLatest("ADD_USER_REQUESTED", addUserWorker);
}

function* deleteUserWatcher() {
    yield takeLatest("DELETE_USER_REQUESTED", deleteUserWorker);
}

function* saveUserWatcher() {
    yield takeLatest("SAVE_USER_REQUESTED", saveUserWorker);
}

export default function* userMngSaga(){
    yield all([
        fetchUserListWatcher(),
        fetchUserWatcher(),
        addUserWatcher(),
        deleteUserWatcher(),
        saveUserWatcher(),
    ]);
};