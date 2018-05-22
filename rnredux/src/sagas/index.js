import { put, takeEvery, all } from 'redux-saga/effects'

import contactListSaga from "./contactListSaga";
import zizhiSaga from "./zizhiSaga";

export default function* rootSaga() {
    yield all([
        contactListSaga(),
        zizhiSaga()
    ]);
}