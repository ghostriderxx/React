import { all, call } from 'redux-saga/effects'

import userMng from "./userMng"
import userEdit from "./userEdit"

export default function* rootSaga(){
    yield all([
        userEdit(),
        userMng(),
    ]);
};
