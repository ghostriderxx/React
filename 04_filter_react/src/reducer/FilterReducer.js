const initialState = {
    data: data,
    filterVal: ""
};

export default function FilterReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FILTER_VAL':
            return {
                ...state,
                filterVal: action.payload
            };
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}
