import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../util/request";
import {goBack} from "react-router-redux";

// Worker
function* fetchUserWorker(action) {
    yield put({type: "FETCH_USER_INPROGRESS"});
    const user = yield call(request, `/api/users/${action.payload}`);
    yield put({type: "FETCH_USER_SUCCESS", payload: user});
}
function* saveUserWorker(action) {
    // 修改用户信息
    const {id, ...rest} = action.payload;
    yield put({type: "SAVE_USER_INPROGRESS"});
    yield call(request, `/api/users/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body:JSON.stringify(rest)
    });
    yield put({type: "SAVE_USER_SUCCESS"});


    // 路由变换，关闭弹出窗口
    yield put(goBack());

    // 重新查询user数据
    yield put({type: "FETCH_USERLIST_REQUESTED"});
}

// Watcher
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