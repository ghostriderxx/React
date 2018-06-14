import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../../../framework/utils/request";

/////////////////////////////////////////////////////////////////////////////
// namespace
//
const namespace = "zzcx";

/////////////////////////////////////////////////////////////////////////////
// InitialState
//
const initialState = {
    zzNums: {
        gszz: null,
        grzz: null,
        rjcpzs: null,
        zzq: null,
        gshj: null,
        grry: null,
        zl: null,
    },
    loading: false,
    errormsg: null
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
        case `${namespace}/FETCH_ZZNUMS_INPROGRESS`:
            return {
                ...initialState,
                loading: true,
            };
        case `${namespace}/FETCH_ZZNUMS_SUCCESS`:
            return {
                ...initialState,
                zzNums: {
                    ...action.payload
                },
                loading: false,
            };

        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////////////
// Sagas
//
function* fetchZznums() {
    yield takeLatest(`${namespace}/FETCH_ZZNUMS_REQUESTED`, function* fetchZizhiList(action) {

        yield put({type: `${namespace}/FETCH_ZZNUMS_INPROGRESS`});

        const obj =  yield call(request, `http://10.1.91.213:8580/dwoa/ZizhiServlet/queryZzCount`);

        yield put({type: `${namespace}/FETCH_ZZNUMS_SUCCESS`, payload: obj});

    });
}

function* effect(){
    yield all([
        fetchZznums(),
    ]);
};


/////////////////////////////////////////////////////////////////////////////
// Export
//
const exports = {
    namespace,
    reducer,
    effect
};
export default exports;