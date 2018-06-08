import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../../framework/util/request";

/////////////////////////////////////////////////////////////////////////////
// namespace
//
const namespace = "cachetMng";

/////////////////////////////////////////////////////////////////////////////
// InitialState
//
const initialState = {
    zlbxxList: [],
    loading: false,
};

/////////////////////////////////////////////////////////////////////////////
// Reducers
//
function cachetReducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {
        case `${namespace}/FETCH_ZLBXX_INPROGRESS`:
            return {
                ...state,
                zlbxxList: [],
                loading: true,
            };
        case `${namespace}/FETCH_ZLBXX_SUCCESS`:
            return {
                ...state,
                zlbxxList: payload,
                loading: false,
            };
        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////////////
// Sagas
//
function* fetchZlbxxWatcher() {
    yield takeLatest(`${namespace}/FETCH_ZLBXX_REQUESTED`, function*(action) {

        yield put({type: `${namespace}/FETCH_ZLBXX_INPROGRESS`});

        const list = yield call(request, "/sep/CachetServlet/fetchZlbxx");

        yield put({type: `${namespace}/FETCH_ZLBXX_SUCCESS`, payload: list});

    });
}
function* cachetSaga(){
    yield all([
        fetchZlbxxWatcher(),
    ]);
};


/////////////////////////////////////////////////////////////////////////////
// Export
//
const exports = {
    namespace,
    reducer: cachetReducer,
    effect: cachetSaga
};
export default exports;