const initialState = {
    sub2List: [],
    selectedRowIndex: -1,
    loading: false,
};

export default function sub2Reducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_SUB2LIST_INPROGRESS":
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_SUB2LIST_SUCCESS':
            return {
                ...state,
                sub2List: action.payload,
                loading: false,
            };
        case "CLEAR_SUB2LIST":
            return {
                ...state,
                sub2List:[],
                loading: false,
                selectedRowIndex: -1,
            };
        case 'SELECT_SUB2_ROW':
            return {
                ...state,
                selectedRowIndex: action.payload
            };
        default:
            return state;
    }
}
