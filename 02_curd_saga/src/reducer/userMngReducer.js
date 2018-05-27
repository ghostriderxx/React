const initialState = {
    userList: [],
};

export default function userMngReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USERLIST_SUCCESS':
            return {
                ...state,
                userList: action.payload,
            };
        default:
            return state;
    }
}
