const initialState = {
    userList: [],
    loading: false,
};

export default function userMngReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_USERLIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            }

        case 'FETCH_USERLIST_SUCCESS':
            return {
                ...state,
                userList: action.payload,
                loading: false,
            };

        case 'CLEAR_USERLIST':
            return {
                ...state,
                userList: [],
            };
        default:
            return state;
    }
}
