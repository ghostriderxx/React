import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'

/**
 * Worker Saga
 */
function* setFilterValWorker(action) {
    if(action.payload.interval > 0){
        yield delay(action.payload.interval);
    }
    yield put({type: "SET_FILTER_VAL", payload: action.payload.filterValue});
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