import {all, call, put, takeLatest} from "redux-saga/es/effects";
import request from "../util/request";
import {goBack} from "react-router-redux";

function* addUserWorker(action) {
    try {
        // 为新用户分配id
        const users = yield call(request, "/api/users");
        const id = users.length+1;

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
    } catch (e) {
        yield put({type: "ADD_USER_FAILED", payload: e.message});
    }

    // 路由变换，关闭弹出窗口
    yield put(goBack());

    // 重新查询userList
    yield put({type: "FETCH_USERLIST_REQUESTED"});
}

function* addUserWatcher() {
    yield takeLatest("ADD_USER_REQUESTED", addUserWorker);
}

export default function* userAddSaga(){
    yield all([
        addUserWatcher(),
    ]);
};