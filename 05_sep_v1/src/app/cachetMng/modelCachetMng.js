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
    cachetTypeList: [],
    cachetLoca:[],
    cachetList: [],
    cachetImageUrl: "",
    loading: false,
};

/////////////////////////////////////////////////////////////////////////////
// Reducers
//
function cachetReducer(state = initialState, action) {

    const {type, payload} = action;

    switch (type) {

        // 查询章类别信息
        case `${namespace}/FETCH_CACHET_TYPE_LIST_INPROGRESS`:
            return {
                ...state,
                cachetTypeList: [],
                loading: true,
            };
        case `${namespace}/FETCH_CACHET_TYPE_LIST_SUCCESS`:
            return {
                ...state,
                cachetTypeList: payload,
                loading: false,
            };



        // 查询章类别下的章信息列表
        case `${namespace}/FETCH_CACHET_LIST_INPROGRESS`:
            return {
                ...state,
                cachetList: [],
                loading: true,
            };
        case `${namespace}/FETCH_CACHET_LIST_SUCCESS`:
            return {
                ...state,
                cachetList: payload,
                loading: false,
            };


        //根据章类别编号查询所在的模板信息
        case `${namespace}/FETCH_CACHET_LOCA_INPROGRESS`:
            return {
                ...state,
                cachetLoca: [],
                loading: true,
            };
        case `${namespace}/FETCH_CACHET_LOCA_SUCCESS`:
            return {
                ...state,
                cachetLoca: payload,
                loading: false,
            };



        //设置章图片URL
        case `${namespace}/SET_CACHET_IMAGE_URL_SUCCESS`:
            return {
                ...state,
                cachetImageUrl: payload,
            };


        default:
            return state;
    }
}

/////////////////////////////////////////////////////////////////////////////
// Sagas
//
// 查询章类别信息
function* fetchCachetTypeListWatcher() {
    yield takeLatest(`${namespace}/FETCH_CACHET_TYPE_LIST_REQUESTED`, function*(action) {

        yield put({type: `${namespace}/FETCH_CACHET_TYPE_LIST_INPROGRESS`});
        const list = yield call(request, "/sep/CachetServlet/fetchCachetTypeList");
        yield put({type: `${namespace}/FETCH_CACHET_TYPE_LIST_SUCCESS`, payload: list});


        // 做联动查询；章类别信息 ==> 章信息列表
        //                    ==> 章类别所在模板信息
        if(list.length){
            const zlbbh = list[0].zlbbh;
            yield put({type: `${namespace}/FETCH_CACHET_LOCA_REQUESTED`, payload:zlbbh});
            yield put({type: `${namespace}/FETCH_CACHET_LIST_REQUESTED`, payload:zlbbh});
        }
    });
}





// 查询章类别下的章信息列表
function* fetchCachetListWatcher() {
    yield takeLatest(`${namespace}/FETCH_CACHET_LIST_REQUESTED`, function*(action) {

        yield put({type: `${namespace}/FETCH_CACHET_LIST_INPROGRESS`});

        const zlbbh = action.payload;
        const list = yield call(request, `/sep/CachetServlet/fetchCachetList?zlbbh=${zlbbh}`);
        yield put({type: `${namespace}/FETCH_CACHET_LIST_SUCCESS`, payload: list});


        // 做图片预览数据联动
        //
        if(list.length){
            const zbh = list[0].zbh;
            yield put({type: `${namespace}/SET_CACHET_IMAGE_URL_REQUESTED`, payload:zbh});
        }





    });
}
//根据章类别编号查询所在的模板信息
function* fetchCachetLocaWatcher() {
    yield takeLatest(`${namespace}/FETCH_CACHET_LOCA_REQUESTED`, function*(action) {

        yield put({type: `${namespace}/FETCH_CACHET_LOCA_INPROGRESS`});

        const zlbbh = action.payload;
        const list = yield call(request, `/sep/CachetServlet/fetchCachetLoca?zlbbh=${zlbbh}`);
        yield put({type: `${namespace}/FETCH_CACHET_LOCA_SUCCESS`, payload: list});

    });
}

function* setCachetImageUrlWatcher() {
    yield takeLatest(`${namespace}/SET_CACHET_IMAGE_URL_REQUESTED`, function*(action) {

        const cacheImageUrl = `/sep/CachetServlet/fetchCachetImage?zbh=${action.payload}&_=${Math.random()}`;

        yield put({
            type: `${namespace}/SET_CACHET_IMAGE_URL_SUCCESS`,
            payload: cacheImageUrl,
        });

    });
}

function* cachetSaga(){
    yield all([
        fetchCachetTypeListWatcher(),
        fetchCachetListWatcher(),
        fetchCachetLocaWatcher(),
        setCachetImageUrlWatcher(),
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