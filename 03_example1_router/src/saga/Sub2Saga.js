import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../util/request";

function* fetchSub2ListWorker(action) {
    try {
        yield put({type: "FETCH_SUB2LIST_INPROGRESS"});

        const sub2List = yield call(request, "/yzMng/fetchSub2List");

        yield put({type: "FETCH_SUB2LIST_SUCCESS", payload: sub2List});
    } catch (e) {
        yield put({type: "FETCH_SUB2LIST_FAILED", payload: e.message});
    }
}

function* fetchSub2ListWatcher() {
    yield takeLatest("FETCH_SUB2LIST_REQUESTED", fetchSub2ListWorker);
}

export default function* Sub2Saga(){
    yield all([
        fetchSub2ListWatcher(),
    ]);
};