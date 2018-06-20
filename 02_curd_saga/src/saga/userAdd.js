import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../util/request";

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

function* addUserWatcher() {
    yield takeLatest("ADD_USER_REQUESTED", addUserWorker);
}

export default function* userMngSaga(){
    yield all([
        addUserWatcher(),
    ]);
};