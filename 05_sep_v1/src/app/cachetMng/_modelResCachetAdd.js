import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import request from "../../framework/util/request";

export default {
    namespace: 'resAachetAdd',

    state: {
    },

    effects: {
        * saveCachetTypeInfoAdd({payload}, {call, put}) {
            const {zlbbh, zlbmc} = payload;

            yield call(request, `/sep/CachetServlet/saveCachetTypeInfoAdd?zlbbh=${zlbbh}&zlbmc=${zlbmc}`);

            // 关闭RES
            yield put({
                type: "lane/closeRes",
            });
        },
    },

    reducers: {
    },
};