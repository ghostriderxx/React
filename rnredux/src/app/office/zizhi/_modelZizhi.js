import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../../../framework/utils/request";

/////////////////////////////////////////////////////////////////////////////
// namespace
//
const namespace = "zizhi";

/////////////////////////////////////////////////////////////////////////////
// InitialState
//
const initialState = {
    zizhiList: [],
    loading: false,
    errormsg: null
};

/////////////////////////////////////////////////////////////////////////////
// Reducers
//
function zizhiReducer(state=initialState, action) {

    const {type, payload} = action;

    switch (type) {

        /**
         * 异步获取资质列表
         */
        case `${namespace}/FETCH_ZIZHILIST_INPROGRESS`:
            return {
                ...state,
                zizhiList: [],
                loading: true,
            };
        case `${namespace}/FETCH_ZIZHILIST_SUCCESS`:
            return {
                ...state,
                zizhiList: action.payload,
                loading: false,
                errormsg: null,
            };

        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////////////
// Sagas
//
function* fetchZizhiList() {
    yield takeLatest(`${namespace}/FETCH_ZIZHILIST_REQUESTED`, function* fetchZizhiList(action) {

        yield put({type: `${namespace}/FETCH_ZIZHILIST_INPROGRESS`});

        const list =  yield call(request, `/dwoa/ZizhiServlet/saveCachetTypeInfoAdd?zlbbh=${zlbbh}&zlbmc=${zlbmc}`);

        yield put({type: `${namespace}/FETCH_ZIZHILIST_SUCCESS`, payload: list});
    });
}

function* zizhiSaga(){
    yield all([
        fetchZizhiList(),
    ]);
};


/////////////////////////////////////////////////////////////////////////////
// Export
//
const exports = {
    namespace,
    reducer: zizhiReducer,
    effect: zizhiSaga
};
export default exports;