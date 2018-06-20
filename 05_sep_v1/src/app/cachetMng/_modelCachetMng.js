import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import request from "../../framework/util/request";

export default {

    namespace: 'cachetMng',

    state: {
        cachetTypeList: [],
        cachetLoca:[],
        cachetList: [],
        cachetImageUrl: "",
        loading: false,
    },

    effects: {
        * setCachetImageUrl({payload}, {call, put}) {
            const cacheImageUrl = `/sep/CachetServlet/fetchCachetImage?zbh=${payload}&_=${Math.random()}`;

            yield put({
                type: `setCachetImageUrlSuccess`,
                payload: cacheImageUrl,
            });
        },

        * fetchCachetLoca({payload}, {call, put}) {

            const list = yield call(request, `/sep/CachetServlet/fetchCachetLoca?zlbbh=${payload}`);

            yield put({
                type: `fetchCachetLocaSuccess`,
                payload: list
            });
        },

        * fetchCachetList({payload}, {call, put}) {

            const list = yield call(request, `/sep/CachetServlet/fetchCachetList?zlbbh=${payload}`);

            yield put({
                type: `fetchCachetListSuccess`,
                payload: list
            });

            if(list.length){ // 做图片预览数据联动
                const zbh = list[0].zbh;
                yield put({
                    type: `setCachetImageUrl`,
                    payload:zbh
                });
            }
        },

        * fetchCachetTypeList({payload}, {call, put}) {

            const list = yield call(request, "/sep/CachetServlet/fetchCachetTypeList");

            yield put({type: `fetchCachetTypeListSuccess`, payload: list});


            // 做联动查询；章类别信息 ==> 章信息列表
            //                    ==> 章类别所在模板信息
            if(list.length){
                const zlbbh = list[0].zlbbh;
                yield put({
                    type: `fetchCachetLoca`,
                    payload:zlbbh
                });
                yield put({
                    type: `fetchCachetList`,
                    payload:zlbbh
                });
            }
        },
    },

    reducers: {
        fetchCachetTypeListSuccess(state, {payload}) {
            return {
                ...state,
                cachetTypeList: payload,
            };
        },

        fetchCachetListSuccess(state, {payload}) {
            return {
                ...state,
                cachetList: payload,
            };
        },

        fetchCachetLocaSuccess(state, {payload}) {
            return {
                ...state,
                cachetLoca: payload,
            };
        },

        setCachetImageUrlSuccess(state, {payload}) {
            return {
                ...state,
                cachetImageUrl: payload,
            };
        },
    },

};