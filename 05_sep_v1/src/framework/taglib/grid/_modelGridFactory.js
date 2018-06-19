import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'
import request from "../../util/request";
import {delay} from "redux-saga";

export default function _modelGridFactory(namespace){
    return {
        namespace,

        state: {
            data: [],
            filterCondition: null,
        },

        subscriptions: {
            setup({dispatch, history}) {
            },
        },

        effects: {
            * gridSort({payload}, {call, put}) {
                yield delay(1000);

                yield put({
                    type: `gridSortSuccess`,
                });
            },
        },

        reducers: {
            gridFillDataSuccess(state, {payload}) {
                return {
                    ...state,
                    data: payload,
                };
            },
            gridSortSuccess(state, {payload}) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                };

            },
        },

    };
}