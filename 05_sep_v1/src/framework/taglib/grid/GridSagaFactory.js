import {all, call, put, takeLatest, fork} from "redux-saga/es/effects";
import {delay} from "redux-saga"

export default function gridSagaFactory(namespace){
    return function*(){
        yield fork(function* gridSortWatcher() {
            yield takeLatest(namespace+"/GRID_SORT_REQUESTED", function*(action){
                yield put({type: namespace+"/GRID_SORT_INPROGRESS"});

                yield delay(1000);

                yield put({type: namespace+"/GRID_SORT_SUCCESS"});
            });
        });
    }
}