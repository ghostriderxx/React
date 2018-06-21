const initialState = {
    loading: false,
};

export default function userAddReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_USER_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
