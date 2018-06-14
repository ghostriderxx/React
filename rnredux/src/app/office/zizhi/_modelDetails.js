import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../../../framework/utils/request";

/////////////////////////////////////////////////////////////////////////////
// namespace
//
const namespace = "zzdetails";

/////////////////////////////////////////////////////////////////////////////
// InitialState
//
const initialState = {
    detaisds: [],
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
        case `${namespace}/FETCH_ZZDetails_INPROGRESS`:
            return {
                ...initialState,
                loading: true,
            };
        case `${namespace}/FETCH_ZZDetails_SUCCESS`:
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
function* fetchZZDetails() {
    yield takeLatest(`${namespace}/FETCH_ZZDetails_REQUESTED`, function* fetchZizhiList(action) {

        yield put({type: `${namespace}/FETCH_ZZDetails_INPROGRESS`});

        const obj =  yield call(request, `http://10.1.91.213:8580/dwoa/ZizhiServlet/queryZZDetails?type=${action.type}&zzid=${action.zzid}`);

        yield put({type: `${namespace}/FETCH_ZZDetails_SUCCESS`, payload: obj});

    });
}

function* effect(){
    yield all([
        fetchZZDetails(),
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