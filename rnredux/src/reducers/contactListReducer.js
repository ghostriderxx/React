const initialState = {
    contacts: [],
    selectedContact: -1,
    loading: false,
    searchKey: "",
}

export default function contactList(state=initialState, action) {
    switch (action.type) {
        case "SELECT_CONTACT":
            return {
                ...state,
                selectedContact: action.payload,
            };



        /**
         * 搜索联系人
         */
        case "SEARCH_CONTACTLIST":
            return {
                ...state,
                searchKey: action.payload,
            }



        /**
         * 异步获取联系人列表
         */
        case "FETCH_CONTACTLIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            }
        case "FETCH_CONTACTLIST_SUCCESS":
            return {
                contacts: action.payload,
                selectedContact: -1,
                loading: false,
                searchKey: "",
            }
        case "FETCH_CONTACTLIST_FAILED":
            return {
                contacts: action.payload,
                selectedContact: -1,
                loading: false,
                searchKey: "",
            }
        default:
            return state;
    }
}
