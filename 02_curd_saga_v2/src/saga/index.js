import { all, call, fork } from 'redux-saga/effects'

import userMngSaga from "./userMngSaga"
import userAddSaga from "./userAddSaga"
import userEditSaga from "./userEditSaga"

export default function* rootSaga(){
    const task1 = yield fork(userMngSaga);
    const task2 = yield fork(userAddSaga);
    const task3 = yield fork(userEditSaga);
};
