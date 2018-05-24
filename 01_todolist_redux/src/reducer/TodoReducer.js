
const initialState = {
    todos: [],

}


function TodoReducer(state = 0, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state + 1;
        case 'TOGGLE_TODO_COMPLETE_STATE':
            return state - 1;
        case 'SET_FILTER_TYPE':
            return state - 1;
        default:
            return state;
    }
}
