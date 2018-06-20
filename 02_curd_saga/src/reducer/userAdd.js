const initialState = {
    loading: false,
    errmsg: null,
};

export default function userAddReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_USER_INPROGRESS":
            return {
                ...state,
                loading: true,
                errmsg: null,
            };
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                errmsg: null,
            };
        case 'ADD_USER_FAILED':
            return {
                ...state,
                loading: false,
                errmsg: action.payload,
            };
        default:
            return state;
    }
}
