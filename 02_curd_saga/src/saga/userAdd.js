import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../util/request";
import uuid from "../util/uuid"
import {goBack} from "react-router-redux";

// Worker
function* addUserWorker(action) {
    // 为新用户分配id
    const id = uuid();

    // 新增用户
    yield put({type: "ADD_USER_INPROGRESS"});
    yield call(request, "/api/users", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body:JSON.stringify({
            id,
            ...action.payload
        })
    });
    yield put({type: "ADD_USER_SUCCESS"});

    // 路由变换，关闭弹出窗口
    yield put(goBack());

    // 重新查询user数据
    yield put({type: "FETCH_USERLIST_REQUESTED"});
}

// Watcher
function* addUserWatcher() {
    yield takeLatest("ADD_USER_REQUESTED", addUserWorker);
}

export default function* userAddSaga(){
    yield all([
        addUserWatcher(),
    ]);
};