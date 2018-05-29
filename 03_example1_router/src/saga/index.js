import { all, call } from 'redux-saga/effects'

import yzMngSaga from "./yzMngSaga"
import sub2Saga from "./Sub2Saga"
import sub3Saga from "./Sub3Saga"

export default function* rootSaga(){
    yield all([
        yzMngSaga(),
        sub2Saga(),
        sub3Saga(),
    ]);
};
