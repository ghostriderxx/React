import { all, call } from 'redux-saga/effects'

import yzMngSaga from "./yzMngSaga"

export default function* rootSaga(){
    yield all([
        yzMngSaga(),
    ]);
};
