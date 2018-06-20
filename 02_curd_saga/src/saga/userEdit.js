import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../util/request";

function* fetchUserWorker(action) {
    try {
        yield put({type: "FETCH_USER_INPROGRESS"});

        const user = yield call(request, "/userMng/fetchUser", action.payload);

        yield put({type: "FETCH_USER_SUCCESS", payload: user});
    } catch (e) {
        yield put({type: "FETCH_USER_FAILED", payload: e.message});
    }
}
function* saveUserWorker(action) {
    yield put({type: "SAVE_USER_INPROGRESS"});

    yield call(request, "/userMng/saveUser", {
        ...action.payload
    });

    yield put({type: "SAVE_USER_SUCCESS"});
}

function* fetchUserWatcher() {
    yield takeLatest("FETCH_USER_REQUESTED", fetchUserWorker);
}

function* saveUserWatcher() {
    yield takeLatest("SAVE_USER_REQUESTED", saveUserWorker);
}



export default function* userEditSaga(){
    yield all([
        fetchUserWatcher(),
        saveUserWatcher(),
    ]);
};