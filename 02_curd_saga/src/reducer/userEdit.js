const initialState = {
    user: {},
    loading: false,
};

export default function userEditReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_USER_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
