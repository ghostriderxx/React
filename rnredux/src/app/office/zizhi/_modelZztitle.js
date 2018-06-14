import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../../../framework/utils/request";

/////////////////////////////////////////////////////////////////////////////
// namespace
//
const namespace = "zztitle";

/////////////////////////////////////////////////////////////////////////////
// InitialState
//
const initialState = {
    zzvds: [],
    type: null,
    loading: false,
};

/////////////////////////////////////////////////////////////////////////////
// Reducers
//
function reducer(state=initialState, action) {

    const {type, payload} = action;

    switch (type) {

        /**
         * 异步获取资质列表
         */
        case `${namespace}/FETCH_ZZTITLE_INPROGRESS`:
            return {
                ...initialState,
                loading: true,
            };
        case `${namespace}/FETCH_ZZTITLE_SUCCESS`:
            return {
                ...initialState,
                ...payload,
                loading: false,
            };

        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////////////
// Sagas
//
function* fetchZztitle() {
    yield takeLatest(`${namespace}/FETCH_ZZTITLE_REQUESTED`, function* fetchZizhiList(action) {

        yield put({type: `${namespace}/FETCH_ZZTITLE_INPROGRESS`});

        const obj =  yield call(request, `http://10.1.91.213:8580/dwoa/ZizhiServlet/queryZZTitle?type=${action.payload}`);

        yield put({type: `${namespace}/FETCH_ZZTITLE_SUCCESS`, payload: obj});

    });
}

function* effect(){
    yield all([
        fetchZztitle(),
    ]);
};


/////////////////////////////////////////////////////////////////////////////
// Export
//
const exports = {
    namespace,
    reducer: reducer,
    effect: effect
};
export default exports;