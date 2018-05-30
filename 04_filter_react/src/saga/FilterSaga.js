import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'

/**
 * Worker Saga
 */
function* setFilterValWorker(action) {
    yield delay(70);
    yield put({type: "SET_FILTER_VAL", payload: action.payload});
}

/**
 * Watcher Saga
 */
function* setFilterValWatcher() {
    yield takeLatest("SET_FILTER_VAL_REQUESTED", setFilterValWorker);
}

export default function* FilterSaga(){
    yield all([
        setFilterValWatcher(),
    ]);
};