const initialState = {
    userList: [],
    loading: false,
};

export default function userMngReducer(state = initialState, action) {
    switch (action.type) {

        /**
         * FetchUserList
         */
        case "FETCH_USERLIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_USERLIST_SUCCESS':
            return {
                ...state,
                userList: action.payload,
                loading: false,
            };

        /**
         * ClearUserList
         */
        case 'CLEAR_USERLIST':
            return {
                ...state,
                userList: [],
            };

        /**
         * DelteUser
         */
        case "DELETE_USER_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}
