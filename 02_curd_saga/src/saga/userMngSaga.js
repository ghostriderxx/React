import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

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

export default function* userMngSaga(){
    yield all([
        fetchUserList()
    ]);
};