import { all, call } from 'redux-saga/effects'

import userMngSaga from "./userMngSaga"

export default function* rootSaga(){
    yield all([
        userMngSaga(),
    ]);
};
