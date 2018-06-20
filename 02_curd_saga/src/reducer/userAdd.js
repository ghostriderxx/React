const initialState = {
    loading: false,
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
        default:
            return state;
    }
}
