import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../../framework/util/request";

/////////////////////////////////////////////////////////////////////////////
// namespace
//
const namespace = "resAachetAdd";

/////////////////////////////////////////////////////////////////////////////
// InitialState
//
const initialState = {
    loading: false,
};

/////////////////////////////////////////////////////////////////////////////
// Reducers
//
function reducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        // 查询章类别信息
        case `${namespace}/SAVE_CACHET_TYPE_INFO_ADD_INPROGRESS`:
            return {
                ...state,
                loading: true,
            };
        case `${namespace}/SAVE_CACHET_TYPE_INFO_ADD_SUCCESS`:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////////////
// Sagas
//
// 章类别信息新增
function* saveCachetTypeInfoAddWatcher() {
    yield takeLatest(`${namespace}/SAVE_CACHET_TYPE_INFO_ADD_REQUESTED`, function*(action) {

        const {zlbbh, zlbmc} = action.payload;

        yield put({type: `${namespace}/SAVE_CACHET_TYPE_INFO_ADD_INPROGRESS`});

        yield call(request, `/sep/CachetServlet/saveCachetTypeInfoAdd?zlbbh=${zlbbh}&zlbmc=${zlbmc}`);

        yield put({type: `${namespace}/SAVE_CACHET_TYPE_INFO_ADD_SUCCESS`});

        // 关闭RES
        yield put({
            type: "lane/CLOSE_RES_REQUESTED",
        });
    });
}

function* effect(){
    yield all([
        saveCachetTypeInfoAddWatcher(),
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