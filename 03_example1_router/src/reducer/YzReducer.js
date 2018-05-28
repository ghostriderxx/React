const initialState = {
    yzList: [],
    selectedRowIndex: 0,
    loading: false,
};

export default function userMngReducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_YZLIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_YZLIST_SUCCESS':
            return {
                ...state,
                yzList: action.payload,
                loading: false,
            };
        case 'SELECT_ROW':
            return {
                ...state,
                selectedRowIndex: action.payload
            };
        default:
            return state;
    }
}
