const initialState = {
    sub3List: [],
    selectedRowIndex: -1,
    loading: false,
};

export default function sub3Reducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_SUB3LIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_SUB3LIST_SUCCESS':
            return {
                ...state,
                sub3List: action.payload,
                loading: false,
            };
        case "CLEAR_SUB3LIST":
            return {
                ...state,
                sub3List:[],
                loading: false,
                selectedRowIndex: -1,
            };
        case 'SELECT_SUB3_ROW':
            return {
                ...state,
                selectedRowIndex: action.payload
            };
        default:
            return state;
    }
}
