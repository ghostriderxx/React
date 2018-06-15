import {all, call, put, takeLatest} from "redux-saga/es/effects";
import { push } from 'connected-react-router'
import request from "../util/request";

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

function* saveUserWatcher() {
    yield takeLatest("SAVE_USER_REQUESTED", saveUserWorker);
}

export default function* userEdit(){
    yield all([
        saveUserWatcher(),
    ]);
};