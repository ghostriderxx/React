const initialState = {
    user: {},
    loading: false,
};

export default function userEditReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_USER_INPROGRESS":
            return {
                ...state,
                user: {},
                loading: true,
            };
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };


        case "SAVE_USER_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'SAVE_USER_SUCCESS':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
