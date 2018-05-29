import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../util/request";

function* fetchSub3ListWorker(action) {
    try {
        yield put({type: "FETCH_SUB3LIST_INPROGRESS"});

        const sub3List = yield call(request, "/yzMng/fetchSub3List");

        yield put({type: "FETCH_SUB3LIST_SUCCESS", payload: sub3List});
    } catch (e) {
        yield put({type: "FETCH_SUB3LIST_FAILED", payload: e.message});
    }
}

function* fetchSub3ListWatcher() {
    yield takeLatest("FETCH_SUB3LIST_REQUESTED", fetchSub3ListWorker);
}

export default function* Sub3Saga(){
    yield all([
        fetchSub3ListWatcher(),
    ]);
};