import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../util/request"

/**
 * Worker Saga
 */
function* fetchYzListWorker(action) {
    try {
        yield put({type: "FETCH_YZLIST_INPROGRESS"});

        const yzList = yield call(request, "/yzMng/fetchYzList");
        yield put({type: "FETCH_YZLIST_SUCCESS", payload: yzList});
    } catch (e) {
        yield put({type: "FETCH_YZLIST_FAILED", payload: e.message});
    }
}

/**
 * Watcher Saga
 */
function* fetchYzListWatcher() {
    yield takeLatest("FETCH_YZLIST_REQUESTED", fetchYzListWorker);
}

export default function* yzMngSaga(){
    yield all([
        fetchYzListWatcher(),
    ]);
};