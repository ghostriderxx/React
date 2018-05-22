const initialState = {
    zizhiList: [],
    loading: false,
    errormsg: null
}

export default function zizhiReducer(state=initialState, action) {
    switch (action.type) {
        /**
         * 异步获取资质列表
         */
        case "FETCH_ZIZHILIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            }
        case "FETCH_ZIZHILIST_SUCCESS":
            return {
                ...state,
                zizhiList: action.payload,
                loading: false,
                errormsg: null,
            }
        case "FETCH_ZIZHILIST_FAILED":
            return {
                ...state,
                zizhiList: [],
                loading: false,
                errormsg: action.payload,
            }
        default:
            return state;
    }
}
