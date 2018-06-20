const initialState = {
    userList: [],
    loading: false,
    errmsg: null,
};

export default function userMngReducer(state = initialState, action) {
    switch (action.type) {

        /**
         * fetchUserList
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
         * clearUserList
         */
        case 'CLEAR_USERLIST':
            return {
                ...state,
                userList: [],
                loading: false,
            };

        /**
         * AddUser
         */
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


        /**
         * deleteUser
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
