import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../framework/util/request";

function* addUserWorker(action) {
    yield put({type: "ADD_USER_INPROGRESS"});

    yield call(request, "/userMng/addUser", {
        ...action.payload
    });

    yield put({type: "ADD_USER_SUCCESS"});
}

function* addUserWatcher() {
    yield takeLatest("ADD_USER_REQUESTED", addUserWorker);
}

export default function* userAddSaga(){
    yield all([
        addUserWatcher(),
    ]);
};