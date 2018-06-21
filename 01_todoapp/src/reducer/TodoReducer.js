const initialState = {
    todos: [],
    visibilityFilter: "SHOW_ALL" // SHOW_ALL、SHOW_COMPLETED、SHOW_ACTIVE
};

export default function TodoReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        ...action.payload,
                    }],
            };
        case 'TOGGLE_TODO_COMPLETE_STATE':
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id != action.payload ? todo : {
                        ...todo,
                        complete: !todo.complete,
                    }
                ),
            };
        case 'SET_VISIBILITY_FILTER':
            return {
                ...state,
                visibilityFilter: action.payload,
            };
        default:
            return state;
    }
}
